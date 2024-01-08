using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.App.Services
{
  public class CardSharingTokenService : ICardSharingTokenService
  {
    private readonly IProfileSharingTokenRepository _repository;
    private readonly IMapper _mapper;

    public CardSharingTokenService(IProfileSharingTokenRepository repository, IMapper mapper)
    {
      _repository = repository;
      _mapper = mapper;
    }
    
    public async Task<long> CreateAsync(ProfileSharingTokenData data, CancellationToken ct)
    {
      var token = new ProfileSharingToken(data.ProfileId);
      _mapper.Map(token, data);
      var t = await _repository.CreateAsync(token, ct);
      return t.ProfileId;
    }

    public void Update(ProfileSharingToken token, ProfileSharingTokenData data)
    {
      _mapper.Map(data, token);
      _repository.Update(token);
    }

    public void Grant(ProfileSharingToken token)
    {
      token.GrantAccess();
      _repository.Update(token);
    }

    public string RequestAuthorization(ProfileSharingToken sharingToken, string token)
    {
      if (sharingToken.Token != token)
      {
        return "Invalid token";
      }

      var result = sharingToken.RequestAuthorization();
      if (string.IsNullOrEmpty(result))
      {
        _repository.Update(sharingToken);
      }

      return result;
    }
  }
}