using System.Collections.Generic;
using MediatR;

namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface IEventSource
  {
    IReadOnlyList<INotification> DomainEvents { get; }
    void AddDomainEvent(INotification eventItem);
    void RemoveDomainEvent(INotification eventItem);
    void ClearDomainEvents();
  }
}