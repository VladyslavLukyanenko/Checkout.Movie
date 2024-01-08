using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Services;
using Checkout.Movie.Profiles.App.Services.Email;
using MediatR;
using Checkout.Movie.Profiles.Core.Events;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.App.EventHandlers
{
  public class TokenAuthorizationRequestedEmailNotifierHandler
    : INotificationHandler<ProfileSharingTokenAuthorizationRequested>
  {
    private readonly IEmailSender _emailSender;
    private readonly ITokenAuthRequestMessagesFactory _messagesFactory;
    private readonly IProfileRepository _profileRepository;
    private readonly IUserRepository _userRepository;

    public TokenAuthorizationRequestedEmailNotifierHandler(IEmailSender emailSender,
      ITokenAuthRequestMessagesFactory messagesFactory, IProfileRepository profileRepository,
      IUserRepository userRepository)
    {
      _emailSender = emailSender;
      _messagesFactory = messagesFactory;
      _profileRepository = profileRepository;
      _userRepository = userRepository;
    }

    public async Task Handle(ProfileSharingTokenAuthorizationRequested notification, CancellationToken ct)
    {
      var card = await _profileRepository.GetByIdAsync(notification.ProfileSharingToken.ProfileId, ct);
      var user = await _userRepository.GetByIdAsync(card.UserId, ct);
      var message = await _messagesFactory.GetMessageAsync(notification.ProfileSharingToken, card, user, ct);

      await _emailSender.SendAsync(message, ct);
    }
  }
}