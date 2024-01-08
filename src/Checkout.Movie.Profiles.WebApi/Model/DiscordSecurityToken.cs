using Newtonsoft.Json;

namespace Checkout.Movie.Profiles.WebApi.Model
{
  public class DiscordSecurityToken
  {
    [JsonProperty("expires_in")] public int ExpiresIn { get; set; }
    [JsonProperty("access_token")] public string AccessToken { get; set; }
    [JsonProperty("refresh_token")] public string RefreshToken { get; set; }
  }
}