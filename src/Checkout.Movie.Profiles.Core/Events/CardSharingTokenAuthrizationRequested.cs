namespace Checkout.Movie.Profiles.Core.Events
{
  public class ProfileSharingTokenAuthorizationRequested : DomainEvent
  {
    public ProfileSharingTokenAuthorizationRequested(ProfileSharingToken profileSharingToken)
    {
      ProfileSharingToken = profileSharingToken;
    }

    public ProfileSharingToken ProfileSharingToken { get; }
  }
}