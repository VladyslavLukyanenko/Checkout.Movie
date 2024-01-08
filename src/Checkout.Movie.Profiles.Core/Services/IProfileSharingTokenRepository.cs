using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Core.Services
{
  public interface IProfileSharingTokenRepository : ICrudRepository<ProfileSharingToken>
  {
    Task<ProfileSharingToken> GetByTokenAsync(string token, CancellationToken ct = default);
  }
}