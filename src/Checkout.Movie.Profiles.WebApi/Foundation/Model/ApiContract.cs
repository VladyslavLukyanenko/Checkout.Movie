namespace Checkout.Movie.Profiles.WebApi.Foundation.Model
{
  public class ApiContract<T>
  {
    public ApiContract(T payload)
      : this(payload, null)
    {
    }

    public ApiContract(ApiError error)
      : this(default!, error)
    {
    }

    protected ApiContract(T payload, ApiError error)
    {
      Payload = payload;
      Error = error;
    }

    public ApiError Error { get; }

    public T Payload { get; }
  }
}