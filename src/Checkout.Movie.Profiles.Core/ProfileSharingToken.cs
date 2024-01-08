using System;
using Checkout.Movie.Profiles.Core.Events;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Core
{
  public class ProfileSharingToken : Entity
  {
    public ProfileSharingToken(long profileId)
    {
      ProfileId = profileId;
      Token = Guid.NewGuid().ToString("D");
    }

    public long ProfileId { get; private set; }
    public string Token { get; private set; }
    public bool RequiresAuthorization { get; set; }
    public DateTimeOffset? GrantedAccessAt { get; private set; }
    public DateTimeOffset? RequestedAuthorizationAt { get; private set; }

    public string RequestAuthorization()
    {
      if (!RequiresAuthorization)
      {
        return "There are no authorization requirement.";
      }

      if (RequestedAuthorizationAt.HasValue)
      {
        return $"Already requested at {RequestedAuthorizationAt} (UTC)";
      }
      
      RequestedAuthorizationAt = DateTimeOffset.UtcNow;
      AddDomainEvent(new ProfileSharingTokenAuthorizationRequested(this));
      return null;
    }

    public void GrantAccess()
    {
      if (GrantedAccessAt.HasValue)
      {
        throw new CoreException("Already granted at " + GrantedAccessAt);
      }

      GrantedAccessAt = DateTimeOffset.UtcNow;
    }
  }
}