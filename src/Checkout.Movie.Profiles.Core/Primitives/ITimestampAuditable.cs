using System;

namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface ITimestampAuditable
  {
    DateTimeOffset CreatedAt { get; }
    DateTimeOffset UpdatedAt { get; }
  }
}