using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.WebApi.Foundation.Filters
{
  public class TransactionScopeFilter : IAsyncActionFilter
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<TransactionScopeFilter> _logger;

    public TransactionScopeFilter(IUnitOfWork unitOfWork, ILogger<TransactionScopeFilter> logger)
    {
      _unitOfWork = unitOfWork;
      _logger = logger;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      using (var tx = await _unitOfWork.BeginTransactionAsync(false))
      {
        try
        {
          var c = await next.Invoke();
          if (c.Exception == null)
          {
            await _unitOfWork.SaveEntitiesAsync();
            await tx.CommitAsync();
          }
        }
        catch (Exception exc)
        {
          _logger.LogError(exc, "Error occurred on persisting changes");
          await tx.RollbackAsync();
        }
      }
    }
  }
}