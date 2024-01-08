using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Model;
using IdentityServer4.Validation;
using Checkout.Movie.Profiles.Core.Primitives;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.WebApi.Services
{
  public class DiscordIdTokenGrantValidator : DiscordAuthenticationGrantValidatorBase
  {
    public const string GrantTypeName = "discord-token.auth";

    public DiscordIdTokenGrantValidator(IDiscordClient discordClient, IUserManager userManager,
      IUserRepository userRepository, IUnitOfWork unitOfWork)
      : base(discordClient, userManager, userRepository, unitOfWork)
    {
    }

    protected override string ExtractAuthPayload(ExtensionGrantValidationContext context) =>
      context.Request.Raw["code"];

    protected override Task<DiscordSecurityToken> AuthenticateAsync(string payload) =>
      DiscordClient.AuthenticateAsync(payload);

    public override string GrantType => GrantTypeName;
  }
}