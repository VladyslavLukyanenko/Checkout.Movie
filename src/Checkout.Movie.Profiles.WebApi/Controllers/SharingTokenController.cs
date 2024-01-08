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
using Checkout.Movie.Profiles.Core;
using Checkout.Movie.Profiles.Core.Services;

namespace Checkout.Movie.Profiles.WebApi.Controllers
{
  public class SharingTokenController : SecuredControllerBase
  {
    private readonly IProfileSharingTokenRepository _repository;
    private readonly ICardSharingTokenService _service;
    private readonly IProfileRepository _profileRepository;
    private readonly ICardSharingTokenProvider _profileSharingTokenProvider;

    public SharingTokenController(IServiceProvider provider, IProfileSharingTokenRepository repository,
      ICardSharingTokenService service, IProfileRepository profileRepository,
      ICardSharingTokenProvider profileSharingTokenProvider) : base(provider)
    {
      _repository = repository;
      _service = service;
      _profileRepository = profileRepository;
      _profileSharingTokenProvider = profileSharingTokenProvider;
    }

    [HttpGet("{profileId:long}")]
    [ProducesResponseType(typeof(ApiContract<IList<ProfileSharingTokenData>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSharingTokens(long profileId, CancellationToken ct)
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

      var list = await _profileSharingTokenProvider.GetSharingTokensAsync(profileId, ct);
      return Ok(list);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> CreateAsync([FromBody] ProfileSharingTokenData data, CancellationToken ct)
    {
      var profile = await _profileRepository.GetByIdAsync(data.ProfileId, ct);
      if (profile == null)
      {
        return NotFound();
      }

      if (profile.UserId != CurrentUserId)
      {
        return Forbid();
      }

      await _service.CreateAsync(data, ct);
      return NoContent();
    }

    [HttpPut("{tokenId:long}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> UpdateAsync(long tokenId, [FromBody] ProfileSharingTokenData data,
      CancellationToken ct)
    {
      var token = await _repository.GetByIdAsync(tokenId, ct);
      var errorResult = await EnsurePermittedAsync(token, ct);
      if (errorResult != null)
      {
        return errorResult;
      }

      _service.Update(token, data);
      return NoContent();
    }

    [HttpPut("{tokenId:long}/grant")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> GrantAsync(long tokenId, CancellationToken ct)
    {
      var token = await _repository.GetByIdAsync(tokenId, ct);
      var errorResult = await EnsurePermittedAsync(token, ct);
      if (errorResult != null)
      {
        return errorResult;
      }

      _service.Grant(token);

      return NoContent();
    }

    [HttpPut("{token}/authorize")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> RequestAuthorizationAsync(string token, CancellationToken ct)
    {
      var sharingToken = await _repository.GetByTokenAsync(token, ct);
      var errorResult = await EnsurePermittedAsync(sharingToken, ct, false);
      if (errorResult != null)
      {
        return errorResult;
      }

      var result = _service.RequestAuthorization(sharingToken, token);
      if (!string.IsNullOrEmpty(result))
      {
        return BadRequest(result);
      }

      return NoContent();
    }

    [HttpDelete("{tokenId:long}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteAsync(long tokenId, CancellationToken ct)
    {
      var token = await _repository.GetByIdAsync(tokenId, ct);
      var errorResult = await EnsurePermittedAsync(token, ct);
      if (errorResult != null)
      {
        return errorResult;
      }

      _repository.Remove(token);
      return NoContent();
    }

    private async Task<IActionResult> EnsurePermittedAsync(ProfileSharingToken token, CancellationToken ct, bool requiresAuthor = true)
    {
      if (token == null)
      {
        return NotFound();
      }

      var profile = await _profileRepository.GetByIdAsync(token.ProfileId, ct);
      if (profile == null)
      {
        return NotFound();
      }

      if (requiresAuthor && profile.UserId != CurrentUserId)
      {
        return Forbid();
      }

      return null;
    }
  }
}