using Autofac;
using Checkout.Movie.Profiles.WebApi.Foundation;
using Checkout.Movie.Profiles.WebApi.Foundation.Config;
using Checkout.Movie.Profiles.WebApi.Services;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Primitives;
using Checkout.Movie.Profiles.Infra;
using Checkout.Movie.Profiles.WebApi.Foundation.SwaggerSupport.Swashbuckle;

namespace Checkout.Movie.Profiles.WebApi
{
  public class Startup
  {
    private const string ApiVersion = "v1";
    private const string ApiTitle = "Profiles API";
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public void ConfigureContainer(ContainerBuilder builder)
    {
      builder.RegisterAssemblyModules(GetType().Assembly);
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
      services
        .AddScoped<IUnitOfWork, DbContextUnitOfWork>();

      services
        .InitializeConfiguration(_configuration)
        .AddApplicationDbContext(_configuration)
        .AddConfiguredCors(_configuration)
        .AddConfiguredMvc()
        .AddConfiguredSignalR()
        .AddConfiguredAuthentication(_configuration)
        .AddConfiguredSwagger(ApiVersion, ApiTitle)
        .AddHttpClient(NamedHttpClients.DiscordClient);


      var s = _configuration.GetSection("IdentityServer");
      services.Configure<IdentityConfig>(s);
      var cfg = new IdentityConfig();
      s.Bind(cfg);

      services.AddConfiguredAspNetIdentity(_configuration);

      services.AddIdentityServer(options =>
        {
          var ssoCfg = _configuration.GetSection("Sso").Get<SsoConfig>();
          options.EmitStaticAudienceClaim = true;
          options.IssuerUri = ssoCfg.ValidIssuer;
        })
        .AddExtensionGrantValidator<DiscordIdTokenGrantValidator>()
        .AddExtensionGrantValidator<DiscordRefreshTokenGrantValidator>()
        .AddAspNetIdentity<User>()
        .AddDeveloperSigningCredential()
        .AddInMemoryClients(IdentityServerStaticConfig.GetClients(cfg))
        .AddInMemoryApiResources(IdentityServerStaticConfig.GetApiResources(cfg))
        .AddInMemoryIdentityResources(IdentityServerStaticConfig.GetIdentityResources())
        .AddProfileService<ProfileService>();

      services.AddScoped<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>()
        .AddScoped<IProfileService, ProfileService>();
      services.AddIdentityServerConfiguredCors(_configuration);

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      var corsConfig = app.UseCommonHttpBehavior(env);
      app.UseStaticFiles();
      app.UseIdentityServer();
      app.UseRouting();
      app.UseConfiguredCors(corsConfig);

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapDefaultControllerRoute();
      });

      app.UseConfiguredSwagger(ApiVersion, ApiTitle);
    }
  }
}