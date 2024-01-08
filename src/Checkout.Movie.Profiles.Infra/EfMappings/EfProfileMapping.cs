using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Checkout.Movie.Profiles.Core;
using Microsoft.EntityFrameworkCore;

namespace Checkout.Movie.Profiles.Infra.EfMappings
{
  public class EfProfileMapping : EfTypeConfigBase<Profile>
  {
    public override void Configure(EntityTypeBuilder<Profile> builder)
    {
      builder.HasOne<User>()
        .WithMany()
        .HasForeignKey(_ => _.UserId);

      builder.OwnsOne(_ => _.CreditCard);
      builder.OwnsOne(_ => _.ShippingAddress);
      builder.OwnsOne(_ => _.BillingAddress);
      builder.Property(_ => _.Tags)
        .HasConversion(t => ToJson(t), json => FromJson<List<string>>(json))
        .HasColumnType("jsonb");
      
      base.Configure(builder);
    }
  }
}