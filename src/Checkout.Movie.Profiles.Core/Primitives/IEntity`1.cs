namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface IEntity<out TKey>
  {
    TKey Id { get; }
  }
}