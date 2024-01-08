using System.Collections.Generic;
using MediatR;

// ReSharper disable UnusedAutoPropertyAccessor.Local

namespace Checkout.Movie.Profiles.Core.Primitives
{
  public abstract class EventSource
  {
    private readonly List<INotification> _domainEvents = new List<INotification>();

    public IReadOnlyList<INotification> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(INotification eventItem)
    {
      _domainEvents.Add(eventItem);
    }

    public void RemoveDomainEvent(INotification eventItem)
    {
      _domainEvents.Remove(eventItem);
    }

    public void ClearDomainEvents()
    {
      _domainEvents.Clear();
    }
  }
}