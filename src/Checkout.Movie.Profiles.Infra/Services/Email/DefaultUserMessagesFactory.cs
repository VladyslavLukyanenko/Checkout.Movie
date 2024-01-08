using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.Infra.Services.Email
{
  public class DefaultUserMessagesFactory : IUserMessagesFactory
  {
    public string CreateEmailConfirmMessage(string code)
    {
      throw new System.NotImplementedException();
    }

    public string CreatePhoneNumberChangeMessage(string code)
    {
      throw new System.NotImplementedException();
    }
  }
}