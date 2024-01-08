using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.Infra.EfMappings
{
  public class UserMappingConfig : EfTypeConfigBase<User>
  {
    public override void Configure(EntityTypeBuilder<User> builder)
    {
      builder.Ignore(_ => _.IsLockedOut);

      builder.HasIndex(u => u.NormalizedUserName).HasName("UserNameIndex").IsUnique();
      builder.Property(u => u.UserName).HasMaxLength(256);
      builder.Property(u => u.NormalizedUserName).HasMaxLength(256);

      builder.OwnsOne(_ => _.Email, eb =>
      {
        eb.Property(u => u.Value).HasMaxLength(256).HasColumnName("Email");
        eb.HasIndex(u => u.NormalizedValue).HasName("EmailIndex");
        eb.Property(u => u.NormalizedValue).HasMaxLength(256).HasColumnName("NormalizedEmail");
        eb.Property(_ => _.IsConfirmed).HasColumnName("IsEmailConfirmed");
      });


      builder.HasMany<UserClaim>().WithOne().HasForeignKey(uc => uc.UserId).IsRequired();
      base.Configure(builder);
    }
  }
}