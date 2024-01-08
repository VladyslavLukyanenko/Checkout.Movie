namespace Checkout.Movie.Profiles.Core.Events
{
  public class IdentityUnlockedDomainEvent
    : DomainEvent
  {
    public IdentityUnlockedDomainEvent(long id)
    {
      Id = id;
    }

    public long Id { get; }
  }
}