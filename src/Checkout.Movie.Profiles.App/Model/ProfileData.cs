using System.Collections.Generic;

namespace Checkout.Movie.Profiles.App.Model
{
  public class ProfileData : PublicProfileData
  {
    
    public List<ProfileSharingTokenData> SharingTokens { get; set; } = new List<ProfileSharingTokenData>();
  }
}