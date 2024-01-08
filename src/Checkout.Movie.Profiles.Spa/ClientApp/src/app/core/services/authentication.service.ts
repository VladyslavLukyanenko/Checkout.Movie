import {Injectable, NgZone} from "@angular/core";
import {Observable, of} from "rxjs";

import {TokenService} from "./token.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {AppSettingsService} from "./app-settings.service";
import {HttpClient} from "@angular/common/http";
import {ExternalAuthToken} from "../../account/services/external-auth-token.model";
import {catchError, map} from "rxjs/operators";
import {ApplicationSecurityToken} from "../models/application-security-token.model";
import {RoutesProvider} from "./routes.provider";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(
    private readonly token: TokenService,
    private readonly settings: AppSettingsService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private zone: NgZone,
    private routesProvider: RoutesProvider,
  ) {
  }

  logOut(): any {
    const routerUrl = this._router.parseUrl(this._router.routerState.snapshot.url);
    if (routerUrl.queryParams.returnUrl) {
      routerUrl.queryParams.returnUrl = null;
    }

    this.token.removeSecurityToken();
  }

  isAuthenticated(): boolean {
    return !!this.token.isAccessTokenValid;
  }

  canReauthenticate(): boolean {
    return this.token.isRefreshTokenValid;
  }

  authenticateWithExternal(request: ExternalAuthToken): Observable<boolean> {
    const authData = new URLSearchParams();
    authData.append("code", request.code);
    authData.append("grant_type", environment.discord.login.auth.grantType);
    authData.append("client_id", environment.discord.login.auth.clientId);
    authData.append("client_secret", environment.discord.login.auth.secret);

    return this.http.post<ApplicationSecurityToken>(this.expandUrl("/connect/token"), authData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .pipe(
        map(token => {
          this.token.setSecurityToken(token);
          return !!token;
        })
      );
  }

  reauthenticate(): Observable<any> {
    const refreshData = new URLSearchParams();
    refreshData.append("refresh_token", this.token.refreshToken);
    refreshData.append("grant_type", environment.discord.login.refresh.grantType);
    refreshData.append("client_id", environment.discord.login.refresh.clientId);
    refreshData.append("client_secret", environment.discord.login.refresh.secret);

    return this.http.post<ApplicationSecurityToken>(this.expandUrl("/connect/token"), refreshData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .pipe(
        catchError(error => {
          console.error(error);
          // if (this.token.isRefreshTokenValid) {
          //   return this.reauthenticate();
          // } else {
          this.logOut();
          this.zone.run(() => {
            this.token.removeSecurityToken();
            this._router.navigate(this.routesProvider.getLoginUrl(), {
              queryParams: {returnUrl: this._router.routerState.snapshot.url},
              relativeTo: this._activatedRoute.root
            });
          });

          return of(null);
          // }
        }),
        map((token: ApplicationSecurityToken) => {
          this.token.setSecurityToken(token);
        })
      );
  }

  // private appendClientInfo(authData: URLSearchParams) {
  //   authData.append("client_id", environment.auth.clientId);
  //   authData.append("client_secret", environment.auth.clientSecret);
  // }

  private expandUrl(relativeUrl: string) {
    return environment.apiHostUrl + relativeUrl;
  }
}
