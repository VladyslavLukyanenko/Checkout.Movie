import {Subscription} from "rxjs";

export interface IExternalLoginProvider {
  initialize(): Subscription;
  performLogin(): Promise<boolean>;
}
