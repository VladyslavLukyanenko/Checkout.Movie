using Checkout.Movie.Profiles.WebApi.Foundation.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Checkout.Movie.Profiles.WebApi.Foundation.Filters
{
  public class HttpGlobalExceptionFilter
    : IExceptionFilter
  {
    private readonly ILogger<HttpGlobalExceptionFilter> _logger;

    public HttpGlobalExceptionFilter(ILogger<HttpGlobalExceptionFilter> logger)
    {
      _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
      _logger.LogError(new EventId(context.Exception.HResult), context.Exception, context.Exception.Message);

      var error = new ApiContract<object>(new ApiError("InternalServerError"));
      IActionResult result = CreateJsonResult(error);
      var statusCode = StatusCodes.Status500InternalServerError;

      context.Result = result;
      context.HttpContext.Response.StatusCode = statusCode;
    }

    private static JsonResult CreateJsonResult<T>(ApiContract<T> error)
    {
      return new JsonResult(error)
      {
        SerializerSettings = new JsonSerializerSettings
        {
          NullValueHandling = NullValueHandling.Ignore,
          ContractResolver = new CamelCasePropertyNamesContractResolver()
        }
      };
    }
  }
}