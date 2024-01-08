import {IExternalLoginProvider} from "./external-login-provider.model";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../core/services/authentication.service";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class DiscordLoginProvider implements IExternalLoginProvider {
  private wnd: Window;
  private resolve: (v: boolean) => void;
  private reject: (v: any) => void;

  constructor(private authService: AuthenticationService) {
  }

  initialize(): Subscription {
    window.addEventListener("storage", this.storageHandler);

    return new Subscription(() => {
      window.removeEventListener("storage", this.storageHandler);
    });
  }

  storageHandler = async (e) => {
    if (e.newValue && e.key === environment.discord.authDiscordCodeKey) {
      this.wnd.close();
      localStorage.removeItem(environment.discord.authDiscordCodeKey);
      try {
        const r = await this.authService.authenticateWithExternal({code: e.newValue}).toPromise();
        this.resolve && this.resolve(r);
      } catch (e) {
        this.reject && this.reject(e);
        return;
      }
    }
  }

  performLogin(): Promise<boolean> {
    this.wnd = window.open(environment.discord.oauth.authorizeUrl, "", "height=400,width=600");
    return new Promise<boolean>((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }

}
