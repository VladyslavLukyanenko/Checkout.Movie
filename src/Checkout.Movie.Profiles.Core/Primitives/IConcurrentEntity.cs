﻿namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface IConcurrentEntity //<out T>
//        : IEntity<T>
//        where T : IComparable<T>, IEquatable<T>
  {
    string ConcurrencyStamp { get; }
  }
}