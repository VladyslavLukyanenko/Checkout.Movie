using System.Threading;
using System.Threading.Tasks;

namespace Checkout.Movie.Profiles.App.Services.Email
{
  public interface IEmailSender
  {
    Task SendAsync(EmailMessage message, CancellationToken ct = default);
  }
}