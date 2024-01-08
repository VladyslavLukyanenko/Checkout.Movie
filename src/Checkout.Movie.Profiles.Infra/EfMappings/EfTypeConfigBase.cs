using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Checkout.Movie.Profiles.Infra.EfMappings
{
  public class EfTypeConfigBase<T> : IEntityTypeConfiguration<T>
    where T : class
  {
    protected static JsonSerializerSettings JsonSettings { get; } = new JsonSerializerSettings
    {
      //            ContractResolver = new 
      NullValueHandling = NullValueHandling.Ignore,
      ContractResolver = new CamelCasePropertyNamesContractResolver()
    };

    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
      var tableName = typeof(T).Name;
      builder.ToTable(tableName);

      if (IsGenericAssignableFrom(typeof(T), typeof(IEntity<>)))
      {
        SetupIdGenerationStrategy(builder);
      }

      if (typeof(IAuthorAuditable).IsAssignableFrom(typeof(T)))
      {
        builder.HasOne<User>()
          .WithMany()
          .HasForeignKey(nameof(IAuthorAuditable.CreatedBy))
          .IsRequired(false);

        builder.HasOne<User>()
          .WithMany()
          .HasForeignKey(nameof(IAuthorAuditable.UpdatedBy))
          .IsRequired(false);

        builder.Property(nameof(IAuthorAuditable.CreatedBy))
          .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

        builder.Property(nameof(IAuthorAuditable.UpdatedBy));
      }

      if (typeof(ITimestampAuditable).IsAssignableFrom(typeof(T)))
      {
        builder.Property(nameof(ITimestampAuditable.CreatedAt))
          //.ValueGeneratedOnAdd()
          .IsRequired()
          .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

        builder.Property(nameof(ITimestampAuditable.UpdatedAt)).IsRequired();
      }

      if (typeof(IEventSource).IsAssignableFrom(typeof(T)))
      {
        builder.Ignore(_ => ((IEventSource) _).DomainEvents);
      }
    }
    
    protected string ToJson(object value)
    {
      return JsonConvert.SerializeObject(value, JsonSettings);
    }

    protected TResult FromJson<TResult>(string json)
    {
      return JsonConvert.DeserializeObject<TResult>(json, JsonSettings);
    }


    private void SetupIdGenerationStrategy(EntityTypeBuilder<T> builder)
    {
      builder.Property(nameof(IEntity<int>.Id))
        .UseHiLo((typeof(T).Name + "HiLoSequence").ToSnakeCase());
    }

    private static bool IsGenericAssignableFrom(Type sourceType, Type baseType)
    {
      return sourceType.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == baseType)
             || sourceType.IsGenericType && sourceType.GetGenericTypeDefinition() == baseType;
    }
  }
}