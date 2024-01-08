using System;
using System.Collections.Generic;
using Checkout.Movie.Profiles.App.Model;
using Checkout.Movie.Profiles.WebApi.Foundation.Mvc.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Checkout.Movie.Profiles.WebApi.Controllers
{
  public class CountriesController: SecuredControllerBase
  {
    public CountriesController(IServiceProvider provider) : base(provider)
    {
    }

    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(typeof(List<Country>), StatusCodes.Status200OK)]
    public IActionResult GetListAsync()
    {
      return File("~/countries.json", "application/json");
    }
  }
}