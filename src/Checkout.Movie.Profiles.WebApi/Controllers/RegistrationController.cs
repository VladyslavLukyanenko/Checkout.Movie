using System;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Foundation.Model;
using Checkout.Movie.Profiles.WebApi.Foundation.Mvc.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Checkout.Movie.Profiles.App.Commands;
using Checkout.Movie.Profiles.App.Services;

namespace Checkout.Movie.Profiles.WebApi.Controllers
{
  public class RegistrationController : SecuredControllerBase
  {
    private readonly IIdentityService _identityService;

    public RegistrationController(IServiceProvider provider, IIdentityService identityService)
      : base(provider)
    {
      _identityService = identityService;
    }

    [HttpPost, AllowAnonymous]
    [ProducesResponseType(typeof(ApiContract<long>), StatusCodes.Status200OK)]
    public async Task<IActionResult> RegisterWithPhoneNumberAsync([FromBody] RegisterWithEmailCommand cmd,
      CancellationToken ct = default)
    {
      long userId = await _identityService.RegisterAsync(cmd, ct);
      return Ok(userId);
    }

    [HttpPost("confirm"), AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> ConfirmPhoneNumberAsync([FromBody] ConfirmEmailCommand cmd,
      CancellationToken ct = default)
    {
      string errorMessage = await _identityService.ConfirmEmailAsync(cmd, ct);
      if (!string.IsNullOrEmpty(errorMessage))
      {
        return BadRequest();
      }

      return NoContent();
    }
  }
}