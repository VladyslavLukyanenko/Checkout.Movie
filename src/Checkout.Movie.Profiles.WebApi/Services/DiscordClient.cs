using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Checkout.Movie.Profiles.WebApi.Model;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Checkout.Movie.Profiles.WebApi.Services
{
  public class DiscordClient : IDiscordClient
  {
    private readonly HttpClient _httpClient;
    private readonly DiscordClientConfig _config;
    private readonly ILogger<DiscordClient> _logger;

    public DiscordClient(IHttpClientFactory clientFactory, DiscordClientConfig config, ILogger<DiscordClient> logger)
    {
      _config = config;
      _logger = logger;
      _httpClient = clientFactory.CreateClient(NamedHttpClients.DiscordClient);
    }

    public Task<DiscordSecurityToken> AuthenticateAsync(string code, CancellationToken ct = default)
    {
      return AuthenticateAsync(payload =>
      {
        payload["grant_type"] = "authorization_code";
        payload["code"] = code;
      }, ct);
    }

    public Task<DiscordSecurityToken> ReauthenticateAsync(string refreshToken, CancellationToken ct = default)
    {
      return AuthenticateAsync(payload =>
      {
        payload["grant_type"] = "refresh_token";
        payload["refresh_token"] = refreshToken;
      }, ct);
    }

    public async Task<DiscordUser> GetProfileAsync(DiscordSecurityToken token, CancellationToken ct = default)
    {
      var profileMessage = new HttpRequestMessage(HttpMethod.Get, new Uri("https://discord.com/api/v6/users/@me"));
      profileMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.AccessToken);
      var response = await _httpClient.SendAsync(profileMessage, ct);
      var raw = await response.Content.ReadAsStringAsync();

      return JsonConvert.DeserializeObject<DiscordUser>(raw);
    }

    public async Task<bool> JoinGuildAsync(DiscordSecurityToken token, DiscordUser user, CancellationToken ct = default)
    {
      var profileMessage = new HttpRequestMessage(HttpMethod.Put,
        new Uri($"https://discord.com/api/v6/guilds/{_config.GuildId}/members/{user.Id}"));
      profileMessage.Headers.Authorization = new AuthenticationHeaderValue("Bot", _config.BotAccessToken);
      profileMessage.Content = new StringContent(JsonConvert.SerializeObject(new {access_token = token.AccessToken}),
        Encoding.UTF8, "application/json");
      var response = await _httpClient.SendAsync(profileMessage, HttpCompletionOption.ResponseHeadersRead, ct);
      
      var joined = response.IsSuccessStatusCode;
      if (!joined)
      {
        _logger.LogWarning($"Can't join user {user.Username}#{user.Discriminator} to guild");
      }

      return joined;
    }

    private async Task<DiscordSecurityToken> AuthenticateAsync(Action<Dictionary<string, string>> requestConfigurer,
      CancellationToken ct = default)
    {
      var authenticateMessage =
        new HttpRequestMessage(HttpMethod.Post, new Uri("https://discord.com/api/v6/oauth2/token"));
      var payload = new Dictionary<string, string>
      {
        {"client_id", _config.ClientId},
        {"client_secret", _config.ClientSecret},
        {"redirect_uri", _config.RedirectUrl},
        {"scope", _config.Scope},
      };

      requestConfigurer(payload);

      authenticateMessage.Content = new FormUrlEncodedContent(payload);
      var response = await _httpClient.SendAsync(authenticateMessage, ct);
      if (!response.IsSuccessStatusCode)
      {
        return null;
      }

      var rawContent = await response.Content.ReadAsStringAsync();

      return JsonConvert.DeserializeObject<DiscordSecurityToken>(rawContent);
    }
  }
}