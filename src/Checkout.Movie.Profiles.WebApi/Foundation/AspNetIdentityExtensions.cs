﻿using Checkout.Movie.Profiles.WebApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Infra.Repositories;

namespace Checkout.Movie.Profiles.WebApi.Foundation
{
  public static class AspNetIdentityExtensions
  {
    public static IServiceCollection AddConfiguredAspNetIdentity(this IServiceCollection services, IConfiguration cfg)
    {
      services.AddIdentity<User, Role>(options =>
        {
          var password = options.Password;
          password.RequireDigit = false;
          password.RequiredLength = 8;
          password.RequireLowercase = false;
          password.RequireUppercase = false;
          password.RequiredUniqueChars = 0;
          password.RequireNonAlphanumeric = false;
          options.SignIn.RequireConfirmedEmail = true;

          options.User.RequireUniqueEmail = true;
        })
        .AddUserStore<EfUserRepository>()
        .AddRoleStore<EfUserRepository>()
        .AddDefaultTokenProviders()
        .AddClaimsPrincipalFactory<EnrichedUserClaimsPrincipalFactory>();
      return services;
    }
  }
}