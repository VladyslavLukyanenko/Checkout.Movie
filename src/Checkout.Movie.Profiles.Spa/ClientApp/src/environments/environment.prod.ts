import {levels} from "loglevel";

export const environment = {
  production: true,
  logLevel: levels.WARN,

  publicProjectName: "Profiles",
  defaultCulture: "en-us",
  defaultCultureCode: "en-us",
  apiHostUrl: "https://api-profiles.checkout.movie",
  supportedImageTypes: ".gif,.png,.jpg,.bmp",
  dateFormat: "YYYY-MM-DD",
  fileSizeLimitBytes: 10485760,
  discord: {
    authDiscordCodeKey: "movie.checkout.profiles.auth.discord.code",
    accessTokenKey: "movie.checkout.profiles.auth.token.access",
    refreshTokenKey: "movie.checkout.profiles.auth.token.refresh",
    refreshTokenExpiryKey: "movie.checkout.profiles.auth.token.refresh.expirationTime",
    oauth: {
      authorizeUrl: "https://discord.com/api/oauth2/authorize?client_id=749560422893486100&redirect_uri=https%3A%2F%2Fprofiles.checkout.movie%2Flogin%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email%20guilds.join",
    },

    login: {
      auth: {
        grantType: "discord-token.auth",
        clientId: "discord-auth.client",
        secret: "secret"
      },
      refresh: {
        grantType: "discord-token.refresh",
        clientId: "discord-refresh.client",
        secret: "secret"
      },

    },
  },

  globalization: {
    date: {
      format: "YYYY-MM-DD"
    }
  }
};
