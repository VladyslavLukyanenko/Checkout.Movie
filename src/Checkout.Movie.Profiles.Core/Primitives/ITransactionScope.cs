using System;
using System.Threading;
using System.Threading.Tasks;

namespace Checkout.Movie.Profiles.Core.Primitives
{
  public interface ITransactionScope
    : IDisposable
  {
    Task RollbackAsync(CancellationToken ct = default);
    Task CommitAsync(CancellationToken ct = default);
  }
}