namespace Checkout.Movie.Profiles.App.Services
{
  public interface IContentTypeResolver
  {
    bool TryResolveByFilePath(string fullPath, out string contentType);
    bool IsImage(string contentType);
  }
}