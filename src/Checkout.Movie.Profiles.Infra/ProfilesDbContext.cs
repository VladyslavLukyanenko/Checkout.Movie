using Microsoft.EntityFrameworkCore;

namespace Checkout.Movie.Profiles.Infra
{
  public class ProfilesDbContext : DbContext
  {
    public ProfilesDbContext(DbContextOptions<ProfilesDbContext> options)
      : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
      modelBuilder.UseSnakeCaseNamingConvention();
      base.OnModelCreating(modelBuilder);
    }
  }
}