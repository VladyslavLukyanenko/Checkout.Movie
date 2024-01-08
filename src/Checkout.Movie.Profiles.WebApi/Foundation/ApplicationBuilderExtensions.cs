using Checkout.Movie.Profiles.WebApi.Foundation.Config;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Checkout.Movie.Profiles.App.Config;

namespace Checkout.Movie.Profiles.WebApi.Foundation
{
  public static class ApplicationBuilderExtensions
  {
    public static IApplicationBuilder UseConfiguredSwagger(this IApplicationBuilder app, string apiVersion,
      string apiTitle)
    {
      app.UseSwagger(c => { });
      app.UseSwaggerUI(c => { c.SwaggerEndpoint($"/swagger/{apiVersion}/swagger.json", apiTitle); });
      return app;
    }

    public static CommonConfig UseCommonHttpBehavior(this IApplicationBuilder app, IWebHostEnvironment env)
    {
      var startupConfig = app.ApplicationServices.GetRequiredService<IOptions<StartupConfiguration>>().Value;

      if (!env.IsDevelopment())
      {
        app.UseHsts();
      }

      if (startupConfig.UseHttps)
      {
        app.UseHttpsRedirection();
      }

      app.UseForwardedHeaders(new ForwardedHeadersOptions
      {
        ForwardedHeaders = ForwardedHeaders.All
      });

      return app.ApplicationServices.GetRequiredService<CommonConfig>();
    }

    public static IApplicationBuilder UseConfiguredCors(this IApplicationBuilder app,
      CommonConfig config)
    {
      if (config.Cors.UseCors)
      {
        app.UseCors("DefaultCors");
      }

      return app;
    }
  }
}