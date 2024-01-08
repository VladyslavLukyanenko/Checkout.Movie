using System.Threading.Tasks;

namespace Checkout.Movie.Profiles.App.Services
{
  public interface IViewRenderService
  {
    Task<string> RenderAsync(string viewName, object model);
  }
}