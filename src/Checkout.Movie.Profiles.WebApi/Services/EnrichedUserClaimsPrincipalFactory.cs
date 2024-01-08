using System.Globalization;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.WebApi.Services
{
  public class EnrichedUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<User, Role>
  {
    public EnrichedUserClaimsPrincipalFactory(UserManager<User> userManager, RoleManager<Role> roleManager,
      IOptions<IdentityOptions> options)
      : base(userManager, roleManager, options)
    {
    }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
    {
      var identity = await base.GenerateClaimsAsync(user);
      TryRemoveClaim(identity, JwtClaimTypes.Name);

      identity.AddClaim(new Claim(JwtClaimTypes.Id, user.Id.ToString(CultureInfo.InvariantCulture)));
      identity.AddClaim(new Claim(JwtClaimTypes.Subject, user.Id.ToString(CultureInfo.InvariantCulture)));
      identity.AddClaim(new Claim(JwtClaimTypes.Email, user.Email.Value));
      identity.AddClaim(new Claim(JwtClaimTypes.EmailVerified, user.Email.IsConfirmed.ToString().ToLowerInvariant()));
      identity.AddClaim(new Claim(JwtClaimTypes.Name, user.Name));
      
      if (user.DiscordId.HasValue)
      {
        identity.AddClaim(new Claim("discord_id", user.DiscordId.ToString()));
      }

      return identity;
    }

    private static void TryRemoveClaim(ClaimsIdentity identity, string claimToRemove)
    {
      var oldNameClaim = identity.FindFirst(claimToRemove);
      if (oldNameClaim != null)
      {
        identity.RemoveClaim(oldNameClaim);
      }
    }
  }
}