using System.Collections.Generic;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Core
{
  public class Profile : Entity
  {
    private Profile()
    {
    }

    public Profile(long userId)
    {
      UserId = userId;
    }

    public long UserId { get; private set; }
    public string Name { get; set; }

    public List<string> Tags { get; set; } = new List<string>();

    public CreditCard CreditCard { get; set; } = new CreditCard();
    public Address ShippingAddress { get; set; } = new Address();
    public Address BillingAddress { get; set; } = new Address();

    public bool AreAddressesSame { get; set; }
  }
}