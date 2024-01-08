using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Model;

namespace Checkout.Movie.Profiles.WebApi.Services
{
  public interface IDiscordClient
  {
    Task<DiscordSecurityToken> AuthenticateAsync(string code, CancellationToken ct = default);
    Task<DiscordSecurityToken> ReauthenticateAsync(string refreshToken, CancellationToken ct = default);
    Task<DiscordUser> GetProfileAsync(DiscordSecurityToken token, CancellationToken ct = default);
    Task<bool> JoinGuildAsync(DiscordSecurityToken token, DiscordUser user, CancellationToken ct = default);
  }
}