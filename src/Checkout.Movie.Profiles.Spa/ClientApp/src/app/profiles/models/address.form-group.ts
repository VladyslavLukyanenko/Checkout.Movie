import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Address} from "../../profiles-api";

export class AddressFormGroup extends FormGroup {
  constructor(data?: Address) {
    data = data || {};
    super({
      firstName: new FormControl(data.firstName, [Validators.required]),
      lastName: new FormControl(data.lastName, [Validators.required]),
      addressLine1: new FormControl(data.addressLine1, [Validators.required]),
      addressLine2: new FormControl(data.addressLine2),
      city: new FormControl(data.city, [Validators.required]),
      phoneNumber: new FormControl(data.phoneNumber, [Validators.required]),
      postCode: new FormControl(data.postCode),
      countryId: new FormControl(data.countryId, [Validators.required]),
      provinceCode: new FormControl(data.provinceCode),
    });
  }

  get firstNameCtrl(): FormControl {
    return this.get("firstName") as FormControl;
  }

  get lastNameCtrl(): FormControl {
    return this.get("lastName") as FormControl;
  }

  get addressLine1Ctrl(): FormControl {
    return this.get("addressLine1") as FormControl;
  }

  get addressLine2Ctrl(): FormControl {
    return this.get("addressLine2") as FormControl;
  }

  get cityCtrl(): FormControl {
    return this.get("city") as FormControl;
  }

  get phoneNumberCtrl(): FormControl {
    return this.get("phoneNumber") as FormControl;
  }

  get postCodeCtrl(): FormControl {
    return this.get("postCode") as FormControl;
  }

  get countryIdCtrl(): FormControl {
    return this.get("countryId") as FormControl;
  }

  get provinceCodeCtrl(): FormControl {
    return this.get("provinceCode") as FormControl;
  }


  get countryId(): string {
    return this.countryIdCtrl.value;
  }

  updatePostalCodeProvinceRequirements(isPostalCodeRequired: boolean, isProvinceCodeRequired: boolean) {
    this.provinceCodeCtrl.clearValidators();
    this.postCodeCtrl.clearValidators();

    if (isPostalCodeRequired) {
      this.postCodeCtrl.setValidators([Validators.required]);
    }

    if (isProvinceCodeRequired) {
      this.provinceCodeCtrl.setValidators([Validators.required]);
    }
  }
}
