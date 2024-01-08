using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Services.Email;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface ITokenAuthRequestMessagesFactory
  {
    Task<EmailMessage> GetMessageAsync(ProfileSharingToken token, Profile profile, User user,
      CancellationToken ct = default);
  }
}