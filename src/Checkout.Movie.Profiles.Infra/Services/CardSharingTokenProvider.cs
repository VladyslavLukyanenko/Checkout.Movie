using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.App.Services;
using Checkout.Movie.Profiles.Core;

namespace Checkout.Movie.Profiles.Infra.Services
{
  public class CardSharingTokenProvider : ICardSharingTokenProvider
  {
    private readonly IQueryable<ProfileSharingToken> _tokens;
    private readonly IMapper _mapper;

    public CardSharingTokenProvider(DbContext context, IMapper mapper)
    {
      _tokens = context.Set<ProfileSharingToken>().AsNoTracking();
      _mapper = mapper;
    }

    public async Task<IList<ProfileSharingTokenData>> GetSharingTokensAsync(long cardId, CancellationToken ct = default)
    {
      var tokens = await _tokens.Where(_ => _.ProfileId == cardId)
        .ToArrayAsync(ct);

      return _mapper.Map<IList<ProfileSharingTokenData>>(tokens);
    }
  }
}