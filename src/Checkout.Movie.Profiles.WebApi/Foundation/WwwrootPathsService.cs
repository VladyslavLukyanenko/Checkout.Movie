using Microsoft.Extensions.Options;
using Checkout.Movie.Profiles.App.Config;
using Checkout.Movie.Profiles.App.Services;

namespace Checkout.Movie.Profiles.WebApi.Foundation
{
  public class WwwrootPathsService
    : IPathsService
  {
    private readonly CommonConfig _commonConfig;

    public WwwrootPathsService(IOptions<CommonConfig> commonConfigOptions)
    {
      _commonConfig = commonConfigOptions.Value;
    }

    public string ToAbsoluteUrl(string path)
    {
      if (string.IsNullOrEmpty(path))
      {
        return null;
      }

      var hostWithScheme = _commonConfig.HostingInfo.HostName;
      if (!path.StartsWith("/") && !hostWithScheme.EndsWith("/"))
      {
        hostWithScheme += "/";
      }

      return hostWithScheme + path;
    }
  }
}