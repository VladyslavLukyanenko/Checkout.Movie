using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.Core.Services;
using Profile = Checkout.Movie.Profiles.Core.Profile;

namespace Checkout.Movie.Profiles.App.Services
{
  public class ProfileService : IProfileService
  {
    private readonly IMapper _mapper;
    private readonly IProfileRepository _repository;

    public ProfileService(IMapper mapper, IProfileRepository repository)
    {
      _mapper = mapper;
      _repository = repository;
    }

    public async Task<long> CreateAsync(long userId, PublicProfileData data, CancellationToken ct = default)
    {
      var profile = new Profile(userId);
      _mapper.Map(data, profile);
      var e = await _repository.CreateAsync(profile, ct);
      return e.Id;
    }

    public void Update(Profile profile, PublicProfileData data)
    {
      _mapper.Map(data, profile);
      _repository.Update(profile);
    }
  }
}