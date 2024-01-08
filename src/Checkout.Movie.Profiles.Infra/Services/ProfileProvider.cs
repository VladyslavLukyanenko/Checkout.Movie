using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.App.Services;
using Checkout.Movie.Profiles.Core;
using Profile = Checkout.Movie.Profiles.Core.Profile;

namespace Checkout.Movie.Profiles.Infra.Services
{
  public class ProfileProvider : IProfileProvider
  {
    private readonly IQueryable<Profile> _profiles;
    private readonly IQueryable<ProfileSharingToken> _tokens;
    private readonly IMapper _mapper;

    public ProfileProvider(DbContext context, IMapper mapper)
    {
      _mapper = mapper;
      _profiles = context.Set<Profile>().AsNoTracking();
      _tokens = context.Set<ProfileSharingToken>().AsNoTracking();
    }

    public async Task<SharedCardLookupResult> GetSharedCardAsync(string token,
      CancellationToken ct = default)
    {
      var query = from creditCard in _profiles
        join sharingToken in _tokens on creditCard.Id equals sharingToken.ProfileId
        where sharingToken.Token == token
        select new { Card = creditCard, Token = sharingToken };
      
      var card = await query.FirstOrDefaultAsync(ct);
      if (card == null)
      {
        return null;
      }
      
      
      var data = _mapper.Map<ProfileData>(card.Card);
      var isAuthorized = card.Token.GrantedAccessAt.HasValue &&
                         card.Token.GrantedAccessAt <= DateTime.Now
                         || !card.Token.RequiresAuthorization;
      return new SharedCardLookupResult
      {
        Profile = data,
        IsAuthorized = isAuthorized
      };
    }

    public async Task<ProfileData> GetProfileByIdAsync(long cardId, CancellationToken ct = default)
    {
      var cardEntity = await _profiles.FirstOrDefaultAsync(_ => _.Id == cardId, ct);
      var card = _mapper.Map<ProfileData>(cardEntity);
      await PopulateSharingTokens(new[] {card}, ct);

      return card;
    }

    public async Task<IList<ProfileData>> GetProfilesAsync(long userId, CancellationToken ct = default)
    {
      var list = await _profiles.Where(_ => _.UserId == userId).ToArrayAsync(ct);
      var cards = _mapper.Map<ProfileData[]>(list);

      await PopulateSharingTokens(cards, ct);

      return cards;
    }

    private async Task PopulateSharingTokens(ProfileData[] cards, CancellationToken ct)
    {
      var ids = cards.Select(_ => _.Id).ToArray();
      var tokens = await _tokens.Where(_ => ids.Contains(_.ProfileId))
        .ToArrayAsync(ct);

      var tokensDict = tokens.Select(_mapper.Map<ProfileSharingTokenData>)
        .ToLookup(_ => _.ProfileId);

      foreach (var card in cards)
      {
        card.SharingTokens = tokensDict[card.Id].ToList();
      }
    }
  }
}