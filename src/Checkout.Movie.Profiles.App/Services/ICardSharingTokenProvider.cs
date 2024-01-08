using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Model;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface ICardSharingTokenProvider
  {
    Task<IList<ProfileSharingTokenData>> GetSharingTokensAsync(long cardId, CancellationToken ct = default);
  }
}