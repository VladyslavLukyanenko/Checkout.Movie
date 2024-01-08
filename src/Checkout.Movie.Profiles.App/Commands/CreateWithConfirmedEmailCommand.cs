using System;
using Checkout.Movie.Profiles.App.Model;

namespace Checkout.Movie.Profiles.App.Commands
{
  public class CreateWithConfirmedEmailCommand : UserData
  {
    public string[] RoleNames { get; set; } = Array.Empty<string>();
    public string Password { get; set; } = null!;
  }
}