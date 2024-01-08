using System.Collections.Generic;
using Autofac;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.StaticFiles;
using Checkout.Movie.Profiles.Infra;

namespace Checkout.Movie.Profiles.WebApi.Foundation.Composition
{
  public class InfraModule : Module
  {
    protected override void Load(ContainerBuilder builder)
    {
      builder.RegisterType<FileExtensionContentTypeProvider>().As<IContentTypeProvider>().InstancePerLifetimeScope();
      builder.RegisterAssemblyTypes(typeof(IDataSeeder).Assembly)
        .AsImplementedInterfaces()
        .InstancePerLifetimeScope();

      builder.RegisterAssemblyTypes(typeof(ProfilesDbContext).Assembly).AsClosedTypesOf(typeof(INotificationHandler<>));
      builder.RegisterType<Mediator>().As<IMediator>().InstancePerLifetimeScope();

      builder.Register<ServiceFactory>(ctx =>
      {
        var context = ctx.Resolve<IComponentContext>();

        return type => context.Resolve(type);
      });
      
      builder.RegisterType<Mapper>().As<IMapper>().InstancePerLifetimeScope();
      builder.RegisterAssemblyTypes(typeof(EntitiesMappingProfile).Assembly)
        .Where(t => typeof(Profile).IsAssignableFrom(t))
        .As<Profile>()
        .SingleInstance();

      builder.Register<IConfigurationProvider>(ctx =>
        {
          var mapperConfig = new MapperConfiguration(cfg =>
          {
            var profiles = ctx.Resolve<IEnumerable<Profile>>();
            foreach (var profile in profiles)
            {
              cfg.AddProfile(profile);
            }

            cfg.DisableConstructorMapping();
          });

          mapperConfig.AssertConfigurationIsValid();
          return mapperConfig;
        })
        .SingleInstance();
    }
  }
}