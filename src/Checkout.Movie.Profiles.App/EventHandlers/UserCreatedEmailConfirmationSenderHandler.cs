using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.App.Services.Email;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Events;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.App.EventHandlers
{
  public class UserCreatedEmailConfirmationSenderHandler : INotificationHandler<UserWithEmailCreatedDomainEvent>
  {
    private readonly UserManager<User> _userManager;
    private readonly IUserMessagesFactory _userMessagesFactory;
    private readonly IEmailSender _emailSender;
    private readonly IEmailMessageFactory _emailMessageFactory;

    public UserCreatedEmailConfirmationSenderHandler(UserManager<User> userManager,
      IUserMessagesFactory userMessagesFactory, IEmailSender emailSender, IEmailMessageFactory emailMessageFactory)
    {
      _userManager = userManager;
      _userMessagesFactory = userMessagesFactory;
      _emailSender = emailSender;
      _emailMessageFactory = emailMessageFactory;
    }

    public async Task Handle(UserWithEmailCreatedDomainEvent notification, CancellationToken cancellationToken)
    {
      if (notification.User.Email.IsConfirmed)
      {
        return;
      }

      var token = await _userManager.GenerateEmailConfirmationTokenAsync(notification.User);
      var message = _userMessagesFactory.CreateEmailConfirmMessage(token);

      var emailMessage = _emailMessageFactory.Create("Email confirmation", message, notification.User.Email.Value);
      await _emailSender.SendAsync(emailMessage, cancellationToken);
    }
  }
}