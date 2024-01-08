using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.Infra.EfMappings
{
  public class RoleMappingConfig : EfTypeConfigBase<Role>
  {
    public override void Configure(EntityTypeBuilder<Role> builder)
    {
      builder.HasIndex(r => r.NormalizedName).HasName("RoleNameIndex").IsUnique();
      builder.Property(u => u.Name).HasMaxLength(256);
      builder.Property(u => u.NormalizedName).HasMaxLength(256);
      base.Configure(builder);
    }
  }
}