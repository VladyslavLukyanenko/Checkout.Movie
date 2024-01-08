using System;

namespace Checkout.Movie.Profiles.App.Model
{
  public class ProfileSharingTokenData
  {
    public long Id { get; set; }

    public long ProfileId { get; set; }
    
    public string Token { get; set; }
    public bool RequiresAuthorization { get; set; }
    
    public DateTimeOffset? GrantedAccessAt { get; set; }
    public bool IsAccessGranted { get; set; }
    
    
    public DateTimeOffset? RequestedAuthorizationAt { get; set; }
    public bool IsRequestedAuthorization { get; set; }

  }
}