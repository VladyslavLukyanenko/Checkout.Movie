using System;
using Checkout.Movie.Profiles.Core.Events;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Core
{
  public class User
    : ConcurrentEntity
  {
    public static readonly long SystemIdentity = 0L;
    private DateTimeOffset? _lockoutEnd;

    private User()
    {
    }

    public DateTimeOffset? LockoutEnd
    {
      get => _lockoutEnd;
      set
      {
        _lockoutEnd = value;
        GenerateSecurityStamp();
      }
    }

    public long? DiscordId { get; private set; }
    public string Name { get; set; }

    /// <summary>Gets or sets the user name for this user.</summary>
    public virtual string UserName { get; set; } = null!;

    /// <summary>Gets or sets the normalized user name for this user.</summary>
    public virtual string NormalizedUserName { get; set; } = null!;

    /// <summary>Gets or sets the email address for this user.</summary>
    public Email Email { get; private set; } = null!;

    /// <summary>
    ///   Gets or sets a salted and hashed representation of the password for this user.
    /// </summary>
    public virtual string PasswordHash { get; set; } = null!;

    /// <summary>
    ///   A random value that must change whenever a users credentials change (password changed, login removed)
    /// </summary>
    public virtual string SecurityStamp { get; set; } = null!;

    /// <summary>
    ///   Gets or sets a flag indicating if the user could be locked out.
    /// </summary>
    /// <value>True if the user could be locked out, otherwise false.</value>
    public virtual bool LockoutEnabled { get; set; }

    /// <summary>
    ///   Gets or sets the number of failed login attempts for the current user.
    /// </summary>
    public virtual int AccessFailedCount { get; set; }

    public bool IsLockedOut => LockoutEnd.GetValueOrDefault() > DateTimeOffset.UtcNow;

    public static User CreateConfirmed(string email, string name)
    {
      var user = CreateWithEmail(Email.CreateConfirmed(email), name);

      return user;
    }

    public static User CreateWithEmail(Email email, string name)
    {
      var user = new User
      {
        Email = email,
        UserName = email.Value,
        Name = name
      };

      user.AddDomainEvent(new UserWithEmailCreatedDomainEvent(user));

      return user;
    }

    public static User CreateWithDiscordId(string rawEmail, string name, long discordId)
    {
      var email = Email.CreateConfirmed(rawEmail);
      var user = new User
      {
        Email = email,
        UserName = email.Value,
        Name = name,
        DiscordId = discordId
      };

      return user;
    }

    public void ToggleLockOut(bool shouldBeLockedOut)
    {
      if (shouldBeLockedOut == IsLockedOut)
      {
        return;
      }

      if (shouldBeLockedOut)
      {
        Unlock();
      }
      else
      {
        LockOut();
      }
    }

    private void LockOut()
    {
      if (IsLockedOut)
      {
        throw new CoreException("AlreadyLockedOut");
      }

      LockoutEnd = DateTimeOffset.MaxValue;
      AddDomainEvent(new IdentityLockedOutDomainEvent(Id, LockoutEnd.Value));
    }

    private void Unlock()
    {
      if (!IsLockedOut)
      {
        throw new CoreException("AlreadyUnlocked");
      }

      LockoutEnd = null;
      AddDomainEvent(new IdentityUnlockedDomainEvent(Id));
    }

    private void GenerateSecurityStamp()
    {
      SecurityStamp = Guid.NewGuid().ToString("N");
    }

    public void SetEmail(string email, in bool isEmailConfirmed)
    {
      if (Email.Value == email && Email.IsConfirmed == isEmailConfirmed)
      {
        return;
      }

      Email = new Email(email, isEmailConfirmed);
    }
  }
}