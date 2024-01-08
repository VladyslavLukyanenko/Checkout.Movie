namespace Checkout.Movie.Profiles.WebApi.Foundation.Config
{
  public class DataSourceConfig
  {
    public string PostgresConnectionString { get; set; }

    public int MaxRetryCount { get; set; }
  }
}