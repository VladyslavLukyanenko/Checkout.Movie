﻿namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface ICrudRepository<T>
    : ICrudRepository<T, long>
    where T : class, IEntity<long>
  {
  }
}