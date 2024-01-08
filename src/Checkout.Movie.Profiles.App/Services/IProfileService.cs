using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface IProfileService
  {
    Task<long> CreateAsync(long userId, PublicProfileData data, CancellationToken ct = default);
    void Update(Profile profile, PublicProfileData data);
  }
}