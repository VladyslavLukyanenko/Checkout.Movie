using System.Data;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Infra
{
  public class DbContextUnitOfWork : IUnitOfWork
  {
    private readonly DbContext _context;
    private readonly IMediator _mediator;

    public DbContextUnitOfWork(DbContext context, IMediator mediator)
    {
      _context = context;
      _mediator = mediator;
    }

    public Task<int> SaveChangesAsync(CancellationToken token = default)
    {
      return _context.SaveChangesAsync(token);
    }

    public async Task<bool> SaveEntitiesAsync(CancellationToken token = default)
    {
      await _mediator.DispatchDomainEvents(_context);
      await SaveChangesAsync(token);
      return true;
    }

    public async Task<ITransactionScope> BeginTransactionAsync(bool autoCommit = true,
      IsolationLevel isolationLevel = IsolationLevel.Unspecified, CancellationToken ct = default)
    {
      var tx = await _context.Database.BeginTransactionAsync(isolationLevel, ct);
      return new EfCoreTransactionScope(tx, autoCommit);
    }

    public void Dispose()
    {
      _context.Dispose();
    }
  }
}