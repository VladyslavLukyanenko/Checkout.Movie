﻿namespace Checkout.Movie.Profiles.App.Commands
{
  public class ConfirmEmailCommand
  {
    public string ConfirmationCode { get; set; } = null!;
    public string Email { get; set; } = null!;
  }
}