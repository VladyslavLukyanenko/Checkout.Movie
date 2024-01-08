using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.Infra.EfMappings
{
  public class EfCardSharingTokenMapping : EfTypeConfigBase<ProfileSharingToken>
  {
    public override void Configure(EntityTypeBuilder<ProfileSharingToken> builder)
    {
      builder.HasOne<Profile>()
        .WithMany()
        .HasForeignKey(_ => _.ProfileId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.Property(_ => _.Token).IsRequired();

      base.Configure(builder);
    }
  }
}