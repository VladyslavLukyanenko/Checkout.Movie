namespace Checkout.Movie.Profiles.Core.Events
{
  public class IdentityRemovedDomainEvent
    : DomainEvent
  {
    public IdentityRemovedDomainEvent(long id)
    {
      Id = id;
    }

    public long Id { get; }
  }
}