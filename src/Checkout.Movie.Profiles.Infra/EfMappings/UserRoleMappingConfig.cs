using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.Infra.EfMappings
{
  public class UserRoleMappingConfig : EfTypeConfigBase<UserRole>
  {
    public override void Configure(EntityTypeBuilder<UserRole> builder)
    {
      builder.HasKey(r => new
      {
        r.UserId, r.RoleId
      });

      builder.HasOne<Role>(EntityMappingUtils.ResolveNavigationField<UserRole, Role>())
        .WithMany().HasForeignKey(ur => ur.RoleId).IsRequired();

      builder.HasOne<User>(EntityMappingUtils.ResolveNavigationField<UserRole, User>())
        .WithMany().HasForeignKey(ur => ur.UserId).IsRequired();
      base.Configure(builder);
    }
  }
}