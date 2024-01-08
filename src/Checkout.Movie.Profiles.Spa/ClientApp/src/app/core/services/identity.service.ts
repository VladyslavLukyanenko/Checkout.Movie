import {Injectable} from "@angular/core";
import {TokenService} from "./token.service";
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {ClaimNames} from "../models/claim-names.model";
import {Identity} from "./identity.model";


@Injectable({
  providedIn: "root"
})
export class IdentityService {
  private readonly userSubj: BehaviorSubject<Identity>;

  constructor(private readonly tokenService: TokenService) {
    this.userSubj = new BehaviorSubject(null);
    tokenService.encodedAccessToken$.subscribe(() => {
      const tokenData = tokenService.decodedAccessToken;

      if (!tokenData) {
        this.userSubj.next(null);
        return;
      }

      const user: Identity = {
        email: tokenData[ClaimNames.email],
        id: tokenData[ClaimNames.id],
        avatar: tokenData[ClaimNames.avatar],
        name: tokenData[ClaimNames.name],
        discordId: tokenData[ClaimNames.discordId],
        discriminator: tokenData[ClaimNames.discriminator],
      };

      this.userSubj.next(user);
    });
  }

  get currentUser(): Identity {
    return this.userSubj.getValue();
  }

  get currentUser$(): Observable<Identity> {
    return this.userSubj.asObservable()
      .pipe(distinctUntilChanged((left, right) => left && right && left.id === right.id));
  }
}
