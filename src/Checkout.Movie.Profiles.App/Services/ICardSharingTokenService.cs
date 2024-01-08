using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface ICardSharingTokenService
  {
    Task<long> CreateAsync(ProfileSharingTokenData data, CancellationToken ct);
    void Update(ProfileSharingToken token, ProfileSharingTokenData data);
    void Grant(ProfileSharingToken token);
    string RequestAuthorization(ProfileSharingToken sharingToken, string token);
  }
}