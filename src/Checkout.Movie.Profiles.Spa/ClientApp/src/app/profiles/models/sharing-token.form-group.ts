import {FormControl, FormGroup} from "@angular/forms";
import {ProfileSharingTokenData} from "../../profiles-api";

export class SharingTokenFormGroup extends FormGroup {
  constructor(data?: ProfileSharingTokenData) {
    data = data || {};
    super({
      profileId: new FormControl(data.profileId),
      token: new FormControl(data.token),
      requiresAuthorization: new FormControl(data.requiresAuthorization),
      grantedAccessAt: new FormControl(data.grantedAccessAt),
      isAccessGranted: new FormControl(data.isAccessGranted),
      requestedAuthorizationAt: new FormControl(data.requestedAuthorizationAt),
      isRequestedAuthorization: new FormControl(data.isRequestedAuthorization),
    });
  }


  get profileId(): string {
    return this.get("profileId").value;
  }

  get token(): string {
    return this.get("token").value;
  }

  get requiresAuthorization(): boolean {
    return this.get("requiresAuthorization").value;
  }

  get grantedAccessAt(): string {
    return this.get("grantedAccessAt").value;
  }

  get isAccessGranted(): boolean {
    return this.get("isAccessGranted").value;
  }

  get requestedAuthorizationAt(): string {
    return this.get("requestedAuthorizationAt").value;
  }

  get isRequestedAuthorization(): boolean {
    return this.get("isRequestedAuthorization").value;
  }

}
