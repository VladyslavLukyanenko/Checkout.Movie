using System.Collections.Generic;

namespace Checkout.Movie.Profiles.Core.Primitives
{
  public class Email : ValueObject
  {
    private Email()
    {
    }

    public Email(string value, bool isConfirmed)
    {
      Value = value;
      NormalizedValue = value.ToUpperInvariant();
      IsConfirmed = isConfirmed;
    }

    public string Value { get; private set; } = null!;
    public string NormalizedValue { get; private set; } = null!;
    public bool IsConfirmed { get; private set; }

    public static Email CreateConfirmed(string rawEmail) => new Email(rawEmail, true);
    public static Email CreateUnconfirmed(string rawEmail) => new Email(rawEmail, false);

    public Email ToggleConfirmed(bool confirmed)
    {
      if (IsConfirmed == confirmed)
      {
        return this;
      }

      return new Email(Value, confirmed);
    }

    protected override IEnumerable<object> GetAtomicValues()
    {
      yield return Value;
      yield return NormalizedValue;
      yield return IsConfirmed;
    }
  }
}