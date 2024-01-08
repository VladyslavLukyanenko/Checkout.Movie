namespace Checkout.Movie.Profiles.WebApi.Model
{
  public class DiscordClientConfig
  {
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string RedirectUrl { get; set; }
    public string Scope { get; set; }
    public string GuildId { get; set; }
    public string BotAccessToken { get; set; }
  }
}