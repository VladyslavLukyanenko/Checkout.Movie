using Microsoft.Extensions.Options;
using Checkout.Movie.Profiles.App.Config;
using Checkout.Movie.Profiles.App.Services.Email;

namespace Checkout.Movie.Profiles.Infra.Services.Email
{
  public class DefaultEmailMessageFactory
    : IEmailMessageFactory
  {
    private readonly CommonConfig _config;

    public DefaultEmailMessageFactory(IOptions<CommonConfig> config)
    {
      _config = config.Value;
    }

    public EmailMessage Create(string subject, string content, params string[] recipientEmails)
    {
      return new EmailMessage(_config.EmailNotifications.SenderEmail, subject, content, recipientEmails);
    }
  }
}