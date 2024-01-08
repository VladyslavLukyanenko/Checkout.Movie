using System;
using MediatR;

namespace Checkout.Movie.Profiles.Core.Events
{
  public abstract class DomainEvent
    : INotification
  {
    public DateTimeOffset Timestamp { get; } = DateTimeOffset.UtcNow;
  }
}