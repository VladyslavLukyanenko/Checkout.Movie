using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Commands;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface IIdentityService
  {
    Task<long> RegisterAsync(RegisterWithEmailCommand cmd, CancellationToken ct = default);
    Task<string> ConfirmEmailAsync(ConfirmEmailCommand cmd, CancellationToken ct = default);
    
    Task<long> CreateConfirmedAsync(CreateWithConfirmedEmailCommand cmd, CancellationToken ct = default);
    Task UpdateAsync(User user, UserData data, CancellationToken ct = default);
  }
}