namespace Checkout.Movie.Profiles.Core.Services
{
  public interface IUserMessagesFactory
  {
    string CreateEmailConfirmMessage(string code);
    string CreatePhoneNumberChangeMessage(string code);
  }
}