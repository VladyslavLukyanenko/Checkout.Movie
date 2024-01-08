namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface IAuthorAuditable
  {
    long? UpdatedBy { get; }
    long? CreatedBy { get; }
  }
}