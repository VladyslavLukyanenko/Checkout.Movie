﻿using System;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Foundation.ActionResults;
using Checkout.Movie.Profiles.WebApi.Foundation.Config;
using Checkout.Movie.Profiles.WebApi.Foundation.Filters;
using Checkout.Movie.Profiles.WebApi.Foundation.FluentValidation;
using Checkout.Movie.Profiles.WebApi.Model;
using FluentValidation.AspNetCore;
using IdentityModel;
using IdentityServer4.AccessTokenValidation;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Checkout.Movie.Profiles.App.Config;
using Checkout.Movie.Profiles.Infra;

namespace Checkout.Movie.Profiles.WebApi.Foundation
{
  // ReSharper disable once InconsistentNaming
  public static class IServiceCollectionExtensions
  {
    private static class CfgSectionNames
    {
      public const string DataSource = nameof(DataSource);
      public const string Common = nameof(Common);
      public const string Discord = nameof(Discord);
      public const string Sso = nameof(Sso);
      public const string EntityFramework = nameof(EntityFramework);
    }

    public static IServiceCollection InitializeConfiguration(this IServiceCollection services, IConfiguration cfg)
    {
      return services.Configure<JsonSerializerSettings>(ConfigureJsonSerializerSettings)
        .ConfigureCfgSectionAs<DataSourceConfig>(cfg, CfgSectionNames.DataSource)
        .ConfigureCfgSectionAs<DiscordClientConfig>(cfg, CfgSectionNames.Discord)
        .ConfigureCfgSectionAs<CommonConfig>(cfg, CfgSectionNames.Common)
        .ConfigureCfgSectionAs<SsoConfig>(cfg, CfgSectionNames.Sso)
        .ConfigureCfgSectionAs<EfCoreConfig>(cfg, CfgSectionNames.EntityFramework);
    }

    public static IServiceCollection ConfigureCfgSectionAs<T>(this IServiceCollection svc, IConfiguration cfg,
      string sectionName) where T : class
    {
      var section = cfg.GetSection(sectionName);
      svc.Configure<T>(section);
      T c = section.Get<T>();
      svc.AddSingleton(c);

      return svc;
    }

    public static IServiceCollection AddApplicationDbContext(this IServiceCollection services,
      IConfiguration cfg)
    {
      var migrationsAssemblyName = typeof(ProfilesDbContext).Assembly.GetName().Name;
      services.AddDbContextPool<ProfilesDbContext>(options =>
        {
          var dataSourceConfig = cfg.GetSection(CfgSectionNames.DataSource).Get<DataSourceConfig>();
          options.UseNpgsql(dataSourceConfig.PostgresConnectionString,
            builder => { builder.MigrationsAssembly(migrationsAssemblyName); });

          options.EnableSensitiveDataLogging();
        })
        .AddLogging()
        .AddMemoryCache();

      services.AddScoped<DbContext>(s => s.GetService<ProfilesDbContext>());

      return services;
    }

    public static IServiceCollection AddConfiguredCors(this IServiceCollection services,
      IConfiguration cfg)
    {
      return services.AddCors(options =>
      {
        options.AddPolicy("DefaultCors", policy =>
        {
          var conf = cfg.GetSection(CfgSectionNames.Common).Get<CommonConfig>();
          policy.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()

            // NOTICE: not allowed "any (*)" origin with credentials
            .WithOrigins(conf.Cors.AllowedHosts.ToArray());
        });
      });
    }

    public static IServiceCollection AddIdentityServerConfiguredCors(this IServiceCollection services,
      IConfiguration cfg)
    {
      services.AddSingleton<ICorsPolicyService>(s =>
      {
        var loggerFactory = s.GetService<ILoggerFactory>();
        var conf = cfg.GetSection(CfgSectionNames.Common).Get<CommonConfig>();
        var cors = new DefaultCorsPolicyService(loggerFactory.CreateLogger<DefaultCorsPolicyService>());
        foreach (var host in conf.Cors.AllowedHosts)
        {
          cors.AllowedOrigins.Add(host);
        }

        return cors;
      });

      return services;
    }

    public static IServiceCollection AddConfiguredMvc(this IServiceCollection services)
    {
      services
        .AddRouting(options =>
        {
          options.LowercaseUrls = true;
          options.LowercaseQueryStrings = true;
        })
        .AddControllers(_ =>
        {
          _.Filters.Add<HttpGlobalExceptionFilter>();
          _.Filters.Add<TransactionScopeFilter>(int.MaxValue);
        })
        .AddFluentValidation(_ =>
        {
          _.RegisterValidatorsFromAssembly(typeof(IServiceCollectionExtensions).Assembly);
          _.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
        })
        .AddJsonOptions(_ => { _.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); })
        .Services
        .AddRazorPages()
        .ConfigureApiBehaviorOptions(_ =>
        {
          _.InvalidModelStateResponseFactory = ctx =>
            new ValidationErrorResult(ctx.ModelState.Keys, ctx.HttpContext.Request.Path);
        })
        .AddViewLocalization(_ => _.ResourcesPath = "Resources")
        .AddNewtonsoftJson(_ =>
        {
          _.AllowInputFormatterExceptionMessages = true;
          _.SerializerSettings.Converters.Add(new StringEnumConverter());
          ConfigureJsonSerializerSettings(_.SerializerSettings);
        })
        .SetCompatibilityVersion(CompatibilityVersion.Latest);

      services.AddTransient<IValidatorInterceptor, ErrorCodesPopulatorValidatorInterceptor>();

      return services;
    }


    public static IServiceCollection AddConfiguredSignalR(this IServiceCollection services)
    {
      services.AddSignalR(options =>
        {
          // configure here...
        })
        .AddNewtonsoftJsonProtocol();

      return services;
    }

    public static IServiceCollection AddConfiguredAuthentication(this IServiceCollection services, IConfiguration cfg)
    {
      var ssoCfg = cfg.GetSection(CfgSectionNames.Sso).Get<SsoConfig>();
      services.Configure<TokenValidationParameters>(o => ToTokenValidationParameters(o, ssoCfg));
      services.AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
          options.DefaultForbidScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
          options.DefaultSignInScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
          options.DefaultSignOutScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
          options.DefaultScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
        })
        .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options =>
          {
            options.Audience = ssoCfg.ValidAudience;
            options.Authority = ssoCfg.AuthorityUrl;
            options.RequireHttpsMetadata = ssoCfg.RequireHttpsMetadata;
            options.TokenValidationParameters = ToTokenValidationParameters(new TokenValidationParameters(), ssoCfg);
            options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
            options.Events = new JwtBearerEvents
            {
              OnMessageReceived = context =>
              {
                var accessToken = context.Request.Query["access_token"];
                var path = context.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                {
                  context.Token = accessToken;
                }

                return Task.CompletedTask;
              }
            };
          },
          options =>
          {
            options.NameClaimType = JwtClaimTypes.Id;
            options.ClientId = ssoCfg.ClientId;
            options.ClientSecret = ssoCfg.ClientSecret;
            options.Authority = ssoCfg.AuthorityUrl;
            options.Validate();
          });

      return services;
    }

    private static TokenValidationParameters ToTokenValidationParameters(TokenValidationParameters target,
      SsoConfig cfg)
    {
      target.ValidateAudience = cfg.ValidateAudience;
      target.ValidateIssuer = cfg.ValidateIssuer;
      target.ValidateLifetime = cfg.ValidateLifetime;
      target.RequireExpirationTime = true;

      target.ValidIssuer = cfg.ValidIssuer;
      target.ValidAudience = cfg.ValidAudience;

      // target.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.IssuerSigningKey));

      return target;
    }


    private static void ConfigureJsonSerializerSettings(JsonSerializerSettings serializerSettings)
    {
      serializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
      serializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
      serializerSettings.NullValueHandling = NullValueHandling.Ignore;
      serializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
      serializerSettings.DateParseHandling = DateParseHandling.DateTimeOffset;
      serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

      JsonConvert.DefaultSettings = () => serializerSettings;
    }
  }
}