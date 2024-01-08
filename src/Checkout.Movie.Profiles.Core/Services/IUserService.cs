using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Core.Services
{
  public interface IUserService
  {
    Task<User> CreateConfirmed(string email, string password, IList<string> roleNames, string name,
      CancellationToken ct = default);

    Task<User> RegisterAsync(Email email, string password, string name, CancellationToken ct = default);
    Task<bool> RemoveAsync(long userId, CancellationToken ct = default);

    Task ChangePasswordAsync(User user, string currentPassword, string newPassword,
      CancellationToken ct = default);
  }
}