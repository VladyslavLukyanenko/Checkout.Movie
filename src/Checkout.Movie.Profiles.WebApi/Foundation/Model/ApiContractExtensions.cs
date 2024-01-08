using System.Diagnostics.CodeAnalysis;

namespace Checkout.Movie.Profiles.WebApi.Foundation.Model
{
  public static class ApiContractExtensions
  {
    public static ApiContract<T> ToApiContract<T>([MaybeNull] this T self)
    {
      return new ApiContract<T>(self);
    }
  }
}