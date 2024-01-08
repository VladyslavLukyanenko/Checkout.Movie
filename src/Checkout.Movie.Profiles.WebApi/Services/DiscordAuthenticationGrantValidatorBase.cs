using System.Security.Claims;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Primitives;
using Checkout.Movie.Profiles.Core.Services;
using Checkout.Movie.Profiles.WebApi.Model;
using IdentityServer4.Models;
using IdentityServer4.Validation;

namespace Checkout.Movie.Profiles.WebApi.Services
{
  public abstract class DiscordAuthenticationGrantValidatorBase : IExtensionGrantValidator
  {
    protected readonly IDiscordClient DiscordClient;
    private readonly IUserManager _userManager;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    protected DiscordAuthenticationGrantValidatorBase(IDiscordClient discordClient, IUserManager userManager,
      IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
      DiscordClient = discordClient;
      _userManager = userManager;
      _userRepository = userRepository;
      _unitOfWork = unitOfWork;
    }

    protected abstract string ExtractAuthPayload(ExtensionGrantValidationContext context);
    protected abstract Task<DiscordSecurityToken> AuthenticateAsync(string payload);

    public async Task ValidateAsync(ExtensionGrantValidationContext context)
    {
      var payload = ExtractAuthPayload(context);
      if (string.IsNullOrEmpty(payload))
      {
        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant);
        return;
      }

      var securityToken = await AuthenticateAsync(payload);
      if (securityToken == null)
      {
        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant);
        return;
      }

      var profile = await DiscordClient.GetProfileAsync(securityToken);
      if (profile == null)
      {
        context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant);
        return;
      }

      var user = await _userRepository.GetByDiscordIdAsync(profile.Id);
      if (user == null)
      {
        user = User.CreateWithDiscordId(profile.Email, profile.Username, profile.Id);
        var error = await _userManager.CreateAsync(user);
        await _unitOfWork.SaveEntitiesAsync();
        if (!string.IsNullOrEmpty(error))
        {
          context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, error);
          return;
        }
      }

      await DiscordClient.JoinGuildAsync(securityToken, profile);

      var avatar = !string.IsNullOrEmpty(profile.Avatar)
        ? $"https://cdn.discordapp.com/avatars/{profile.Id}/{profile.Avatar}.png"
        : null;

      var claims = new[]
      {
        new Claim("avatar", avatar),
        new Claim("discriminator", profile.Discriminator),
        new Claim("discord_access_token", securityToken.AccessToken),
        new Claim("discord_refresh_token", securityToken.RefreshToken),
      };

      context.Result = new GrantValidationResult(user.Id.ToString(), GrantType, claims);
    }

    public abstract string GrantType { get; }
  }
}