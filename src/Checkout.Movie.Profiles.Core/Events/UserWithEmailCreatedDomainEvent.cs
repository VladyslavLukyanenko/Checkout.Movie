namespace Checkout.Movie.Profiles.Core.Events
{
  public class UserWithEmailCreatedDomainEvent
    : DomainEvent
  {
    public UserWithEmailCreatedDomainEvent(User user)
    {
      User = user;
    }

    public User User { get; }
  }
}