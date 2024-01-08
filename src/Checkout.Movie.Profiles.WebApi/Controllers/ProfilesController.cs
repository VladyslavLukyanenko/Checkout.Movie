using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Foundation.Model;
using Checkout.Movie.Profiles.WebApi.Foundation.Mvc.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.App.Services;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.WebApi.Controllers
{
  public class ProfilesController : SecuredControllerBase
  {
    private readonly IProfileProvider _profileProvider;
    private readonly IProfileService _profileService;
    private readonly IProfileRepository _profileRepository;

    public ProfilesController(IServiceProvider provider, IProfileProvider profileProvider,
      IProfileService profileService, IProfileRepository profileRepository)
      : base(provider)
    {
      _profileProvider = profileProvider;
      _profileService = profileService;
      _profileRepository = profileRepository;
    }

    [HttpGet("{profileId:long}")]
    [ProducesResponseType(typeof(ApiContract<ProfileData>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByIdAsync(long profileId, CancellationToken ct)
    {
      var profile = await _profileProvider.GetProfileByIdAsync(profileId, ct);
      if (profile.UserId != CurrentUserId)
      {
        return Forbid();
      }

      return Ok(profile);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiContract<IList<ProfileData>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetListAsync(CancellationToken ct)
    {
      var list = await _profileProvider.GetProfilesAsync(CurrentUserId, ct);
      return Ok(list);
    }

    [HttpGet("{token}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiContract<PublicProfileData>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSharedAsync(string token, CancellationToken ct)
    {
      var profile = await _profileProvider.GetSharedCardAsync(token, ct);
      if (profile == null)
      {
        return NotFound("Requested profile not found");
      }

      if (!profile.IsAuthorized)
      {
        return Forbid();
      }

      return Ok(profile.Profile);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiContract<long>), StatusCodes.Status204NoContent)]
    public async Task<IActionResult> CreateAsync([FromBody] PublicProfileData data, CancellationToken ct)
    {
      long profileId = await _profileService.CreateAsync(CurrentUserId, data, ct);
      return Ok(profileId);
    }

    [HttpPut("{profileId:long}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateAsync(long profileId, [FromBody] PublicProfileData data,
      CancellationToken ct)
    {
      var profile = await _profileRepository.GetByIdAsync(profileId, ct);
      if (profile == null)
      {
        return NotFound();
      }

      if (profile.UserId != CurrentUserId)
      {
        return Forbid();
      }

      _profileService.Update(profile, data);
      return NoContent();
    }


    [HttpDelete("{profileId:long}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteAsync(long profileId, CancellationToken ct)
    {
      var profile = await _profileRepository.GetByIdAsync(profileId, ct);
      if (profile == null)
      {
        return NotFound();
      }

      if (profile.UserId != CurrentUserId)
      {
        return Forbid();
      }

      _profileRepository.Remove(profile);
      return NoContent();
    }
  }
}