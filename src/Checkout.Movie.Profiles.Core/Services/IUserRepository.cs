using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Core.Services
{
  public interface IUserRepository
    : ICrudRepository<User>
  {
    Task<IList<string>> GetRolesAsync(long userId, CancellationToken ct = default);
    Task<User> GetByEmailAsync(string subject, CancellationToken ct = default);
    Task<User> GetByDiscordIdAsync(long discordId, CancellationToken ct = default);
  }
}