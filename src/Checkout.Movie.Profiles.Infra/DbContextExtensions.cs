using Microsoft.EntityFrameworkCore;

namespace Checkout.Movie.Profiles.Infra
{
  public static class DbContextExtensions
  {
    // ReSharper disable once CognitiveComplexity
    public static void UseSnakeCaseNamingConvention(this ModelBuilder modelBuilder)
    {
      foreach (var entity in modelBuilder.Model.GetEntityTypes())
      {
        // Replace table names
        if (string.IsNullOrEmpty(entity.BaseType?.GetRootType().ShortName()))
        {
          entity.SetTableName(entity.GetTableName().ToSnakeCase());
          entity.SetSchema(entity.GetSchema().ToSnakeCase());
        }

        // Replace column names            
        foreach (var property in entity.GetProperties())
        {
          if (property.IsShadowProperty()) continue;

          property.SetColumnName(property.GetColumnName().ToSnakeCase());
        }

        foreach (var key in entity.GetKeys())
        {
          key.SetName(key.GetName().ToSnakeCase());
        }

        foreach (var key in entity.GetForeignKeys())
        {
          key.SetConstraintName(key.GetDefaultName().ToSnakeCase());
        }

        foreach (var index in entity.GetIndexes())
        {
          index.SetName(index.GetName().ToSnakeCase());
        }
      }
    }
  }
}