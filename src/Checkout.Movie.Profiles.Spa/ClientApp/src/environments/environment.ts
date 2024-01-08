import {levels} from "loglevel";

export const environment = {
  production: false,
  logLevel: levels.DEBUG,

  publicProjectName: "Profiles",
  defaultCulture: "en-us",
  defaultCultureCode: "en-us",
  apiHostUrl: "http://localhost:5000",
  supportedImageTypes: ".gif,.png,.jpg,.bmp",
  dateFormat: "YYYY-MM-DD",
  fileSizeLimitBytes: 10485760,
  discord: {
    authDiscordCodeKey: "movie.checkout.profiles.auth.discord.code",
    accessTokenKey: "movie.checkout.profiles.auth.token.access",
    refreshTokenKey: "movie.checkout.profiles.auth.token.refresh",
    refreshTokenExpiryKey: "movie.checkout.profiles.auth.token.refresh.expirationTime",
    oauth: {
      authorizeUrl: "https://discord.com/api/oauth2/authorize?client_id=748514144600457236&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin%2Fdiscord%2Fcallback&response_type=code&scope=email%20identify%20guilds.join",
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
