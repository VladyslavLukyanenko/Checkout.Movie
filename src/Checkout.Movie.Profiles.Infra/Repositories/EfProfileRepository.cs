using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Primitives;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.Infra.Repositories
{
  public class EfProfileRepository : EfCrudRepository<Profile>, IProfileRepository
  {
    public EfProfileRepository(DbContext context, IUnitOfWork unitOfWork) : base(context, unitOfWork)
    {
    }
  }
}