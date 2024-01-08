using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Infra.Repositories
{
  public abstract class EfCrudRepository<T>
    : EfCrudRepository<T, long>
    where T : class, IEntity<long>
  {
    protected EfCrudRepository(DbContext context, IUnitOfWork unitOfWork)
      : base(context, unitOfWork)
    {
    }
  }
}