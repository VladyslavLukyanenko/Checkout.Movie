using Microsoft.AspNetCore.Mvc;

namespace Checkout.Movie.Profiles.WebApi.Foundation.Mvc
{
  public class ApiHttpGetV1Attribute : HttpGetAttribute
  {
    public ApiHttpGetV1Attribute(string template = "", bool fromRoot = false)
      : base(fromRoot && !template.StartsWith("/")
        ? "/" + ApiV1HttpRouteAttribute.Prefix + template
        : ApiV1HttpRouteAttribute.Prefix + template)
    {
      FromRoot = fromRoot;
    }

    public bool FromRoot { get; }
  }
}