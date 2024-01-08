using Checkout.Movie.Profiles.App.Model;

namespace Checkout.Movie.Profiles.App.Commands
{
  public class RegisterWithEmailCommand : UserData
  {
    public string Password { get; set; } = null!;
  }
}