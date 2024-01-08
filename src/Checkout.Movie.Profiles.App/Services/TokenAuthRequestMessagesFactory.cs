using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Services.Email;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.App.Services
{
  public class TokenAuthRequestMessagesFactory : ITokenAuthRequestMessagesFactory
  {
    private readonly IEmailMessageFactory _emailMessageFactory;

    public TokenAuthRequestMessagesFactory(IEmailMessageFactory emailMessageFactory)
    {
      _emailMessageFactory = emailMessageFactory;
    }

    public Task<EmailMessage> GetMessageAsync(ProfileSharingToken token, Profile profile, User user,
      CancellationToken ct = default)
    {
      var content = @$"Dear {user.Name},<br>
Someone requested access to profile <strong>'{profile.Name}'</strong>";
      var emailMessage = _emailMessageFactory.Create("Profile access request", content, user.Email.Value);
      return Task.FromResult(emailMessage);
    }
  }
}