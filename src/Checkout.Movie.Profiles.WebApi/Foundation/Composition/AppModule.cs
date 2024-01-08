using Autofac;
using Checkout.Movie.Profiles.App.Services;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.WebApi.Foundation.Composition
{
  public class AppModule: Module
  {
    protected override void Load(ContainerBuilder builder)
    {
      builder.RegisterAssemblyTypes(typeof(User).Assembly)
        .InNamespaceOf<UserService>()
        .AsImplementedInterfaces()
        .InstancePerLifetimeScope();

      builder.RegisterAssemblyTypes(typeof(AspNetIdentityUserManager).Assembly)
        .AsImplementedInterfaces()
        .InstancePerLifetimeScope();
      
      builder.RegisterAssemblyTypes(GetType().Assembly)
        .AsImplementedInterfaces()
        .InstancePerLifetimeScope();
      
      //
      // builder.RegisterAssemblyTypes(typeof(UserData).Assembly)
      //   .InNamespaceOf<AspNetIdentityUserManager>()
      //   .AsImplementedInterfaces()
      //   .InstancePerLifetimeScope();
      //
      // builder.RegisterAssemblyTypes(typeof(UserService).Assembly)
      //   .InNamespaceOf<UserService>()
      //   .AsImplementedInterfaces()
      //   .InstancePerLifetimeScope();
    }
  }
}