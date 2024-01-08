using System;

// ReSharper disable UnusedAutoPropertyAccessor.Local

namespace Checkout.Movie.Profiles.Core.Primitives
{
  public abstract class TimestampAuditableEntity<TKey>
    : Entity<TKey>, ITimestampAuditable
    where TKey : IComparable<TKey>, IEquatable<TKey>
  {
    protected TimestampAuditableEntity()
    {
    }

    protected TimestampAuditableEntity(TKey id)
      : base(id)
    {
    }

    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }
  }

  public abstract class TimestampAuditableEntity
    : TimestampAuditableEntity<long>
  {
    protected TimestampAuditableEntity()
    {
    }

    protected TimestampAuditableEntity(long id)
      : base(id)
    {
    }
  }
}