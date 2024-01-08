using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Primitives;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.Infra.Repositories
{
  public class EfProfileSharingTokenRepository : EfCrudRepository<ProfileSharingToken>, IProfileSharingTokenRepository
  {
    public EfProfileSharingTokenRepository(DbContext context, IUnitOfWork unitOfWork) : base(context, unitOfWork)
    {
    }

    public Task<ProfileSharingToken> GetByTokenAsync(string token, CancellationToken ct = default)
    {
      return DataSource.FirstOrDefaultAsync(_ => _.Token == token, ct);
    }
  }
}