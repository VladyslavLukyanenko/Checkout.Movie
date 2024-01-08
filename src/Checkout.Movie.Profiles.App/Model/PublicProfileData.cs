using System.Collections.Generic;
using Newtonsoft.Json;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.App.Model
{
  public class PublicProfileData
  {
    public long Id { get; set; }
    
    [JsonIgnore]
    public long UserId { get; set; }
    public string Name { get; set; }

    public List<string> Tags { get; set; } = new List<string>();

    public CreditCard CreditCard { get; set; } = new CreditCard();
    public Address ShippingAddress { get; set; } = new Address();
    public Address BillingAddress { get; set; } = new Address();

    public bool AreAddressesSame { get; set; }
  }
}