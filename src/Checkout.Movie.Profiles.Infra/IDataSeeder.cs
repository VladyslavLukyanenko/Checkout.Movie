using System.Threading.Tasks;

namespace Checkout.Movie.Profiles.Infra
{
  public interface IDataSeeder
  {
    int Order { get; }

    Task SeedAsync();
  }
}