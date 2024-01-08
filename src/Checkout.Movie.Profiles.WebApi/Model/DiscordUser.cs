namespace Checkout.Movie.Profiles.WebApi.Model
{
  public class DiscordUser
  {
    public long Id { get; set; }
    public string Discriminator { get; set; }
    public string Username { get; set; }
    public string Avatar { get; set; }
    public string Locale { get; set; }
    public string Email { get; set; }
  }
}