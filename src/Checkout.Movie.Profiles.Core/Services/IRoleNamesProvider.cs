using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Checkout.Movie.Profiles.Core.Services
{
  public interface IRoleNamesProvider
  {
    Task<IList<string>> GetRoleNamesAsync(int userId, CancellationToken ct = default);
    Task<IDictionary<long, IList<string>>> GetRoleNamesAsync(IEnumerable<long> userId, CancellationToken ct = default);
  }
}