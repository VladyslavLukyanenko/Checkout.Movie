using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Model;
using IdentityServer4.Validation;
using Checkout.Movie.Profiles.Core.Primitives;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.WebApi.Services
{
  public class DiscordRefreshTokenGrantValidator : DiscordAuthenticationGrantValidatorBase
  {
    public const string GrantTypeName = "discord-token.refresh";

    public DiscordRefreshTokenGrantValidator(IDiscordClient discordClient, IUserManager userManager,
      IUserRepository userRepository, IUnitOfWork unitOfWork)
      : base(discordClient, userManager, userRepository, unitOfWork)
    {
    }

    protected override string ExtractAuthPayload(ExtensionGrantValidationContext context) =>
      context.Request.Raw["refresh_token"];

    protected override Task<DiscordSecurityToken> AuthenticateAsync(string payload) =>
      DiscordClient.ReauthenticateAsync(payload);

    public override string GrantType => GrantTypeName;
  }
}