using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Model;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface IProfileProvider
  {
    Task<SharedCardLookupResult> GetSharedCardAsync(string token, CancellationToken ct = default);

    Task<ProfileData> GetProfileByIdAsync(long cardId, CancellationToken ct = default);
    Task<IList<ProfileData>> GetProfilesAsync(long userId, CancellationToken ct = default);
  }
}