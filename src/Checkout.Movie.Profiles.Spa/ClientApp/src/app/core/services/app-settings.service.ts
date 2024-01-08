import {Injectable, Optional, SkipSelf} from "@angular/core";
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {getLogger} from "./logging.service";

export interface Culture {
  isoCode: string;
  friendlyName: string;
}

const preferredCultureKey = "movie.checkout.profiles.preferredCulture";

export function defaultLocaleProvider(): string {
  return localStorage.getItem(preferredCultureKey) || environment.defaultCultureCode;
}

@Injectable({
  providedIn: "root"
})
export class AppSettingsService {
  private _log = getLogger("AppSettingsService");

  constructor(
    @Optional()
    @SkipSelf()
      alreadyLoadedSettings: AppSettingsService,
    private translateService: TranslateService,
  ) {
    if (alreadyLoadedSettings) {
      throw new Error("This service MUST be singleton!");
    }

    this.translateService.use(environment.defaultCultureCode).toPromise();
  }
}
