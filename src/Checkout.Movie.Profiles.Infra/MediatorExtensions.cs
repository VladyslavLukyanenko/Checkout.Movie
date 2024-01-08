using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Checkout.Movie.Profiles.Core.Primitives;

namespace Checkout.Movie.Profiles.Infra
{
  public static class MediatorExtensions
  {
    public static async Task DispatchDomainEvents(this IMediator mediator, DbContext context)
    {
      var domainEntries = context.ChangeTracker
        .Entries<IEventSource>()
        .Where(_ => _.Entity.DomainEvents.Any())
        .ToList();

      var domainEvents = domainEntries.SelectMany(_ => _.Entity.DomainEvents)
        .ToList();

      domainEntries.ForEach(entry => entry.Entity.ClearDomainEvents());

      foreach (INotification domainEvent in domainEvents)
      {
        await mediator.Publish(domainEvent);
      }

      //            
//            var tasks = domainEvents
//                .Select(async domainEvent => await mediator.Publish(domainEvent))
//                .ToList();
//
//            await Task.WhenAll(tasks);
    }
  }
}