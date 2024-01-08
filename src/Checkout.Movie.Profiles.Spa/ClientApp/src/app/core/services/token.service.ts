import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable} from "rxjs";
import {ApplicationSecurityToken} from "../models/application-security-token.model";

const ACCESS_TOKEN_STORE_KEY = "movie.checkout.profiles.token.access";
// const REFRESH_TOKEN_STORE_KEY = "movie.checkout.profiles.token.refresh";
const REFRESH_TOKEN_EXPIRY_STORE_KEY = "movie.checkout.profiles.token.refresh.expiry";
const REFRESH_TOKEN_LIFETIME = 604789988; // 7 days

@Injectable({
  providedIn: "root"
})
export class TokenService {
  private readonly _jwtService: JwtHelperService = new JwtHelperService();
  private _accessTokenSubject$ = new BehaviorSubject<string>(this.encodedAccessToken);
  private _refreshTokenSubject$ = new BehaviorSubject<string>(this.refreshToken);

  get encodedAccessToken$(): Observable<string> {
    return this._accessTokenSubject$.asObservable();
  }

  get encodedRefreshToken$(): Observable<string> {
    return this._refreshTokenSubject$.asObservable();
  }

  get encodedAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_STORE_KEY);
  }

  get refreshToken(): string {
    const token = this.decodedAccessToken;
    return token && token.discord_refresh_token || null;
  }

  get decodedAccessToken(): any {
    return this._jwtService.decodeToken(this.encodedAccessToken);
  }

  get accessTokenExpirationDate(): Date {
    return this._jwtService.getTokenExpirationDate(this.encodedAccessToken);
  }

  get refreshTokenExpirationDate(): Date {
    const expiry = localStorage.getItem(REFRESH_TOKEN_EXPIRY_STORE_KEY);
    if (!expiry) {
      return new Date(-1);
    }

    return new Date(+ expiry);
  }

  get isRefreshTokenValid(): boolean {
    return !!this.refreshToken && this.refreshTokenExpirationDate > new Date();
  }

  get isAccessTokenValid(): boolean {
    return !!this.encodedAccessToken && !this._jwtService.isTokenExpired(this.encodedAccessToken);
  }

  setSecurityToken(token: ApplicationSecurityToken): void {
    this.setEncodedAccessToken(token.access_token);
    const decoded = this.decodedAccessToken;
    this.setEncodedRefreshToken(decoded.discord_refresh_token);
  }

  removeSecurityToken() {
    localStorage.removeItem(ACCESS_TOKEN_STORE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_EXPIRY_STORE_KEY);

    this._accessTokenSubject$.next(null);
    this._refreshTokenSubject$.next(null);
  }

  private setEncodedAccessToken(token: string) {
    if (!token) {
      throw new Error("Trying to set null value for token");
    }
    localStorage.setItem(ACCESS_TOKEN_STORE_KEY, token);
    this._accessTokenSubject$.next(token);
  }

  private setEncodedRefreshToken(token: string) {
    if (!token) {
      throw new Error("Trying to set null value for token");
    }

    localStorage.setItem(REFRESH_TOKEN_EXPIRY_STORE_KEY, (Date.now() + REFRESH_TOKEN_LIFETIME).toString());
    this._refreshTokenSubject$.next(token);
  }
}
