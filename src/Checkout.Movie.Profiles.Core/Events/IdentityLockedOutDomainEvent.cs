using System;

namespace Checkout.Movie.Profiles.Core.Events
{
  public class IdentityLockedOutDomainEvent
    : DomainEvent
  {
    public IdentityLockedOutDomainEvent(long id, DateTimeOffset lockoutEnd)
    {
      Id = id;
      LockoutEnd = lockoutEnd;
    }

    public long Id { get; }
    public DateTimeOffset LockoutEnd { get; }
  }
}