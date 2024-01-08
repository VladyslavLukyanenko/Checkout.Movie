import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as cardValidator from "card-validator";

export class CreditCardValidator {

  static number: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const result = cardValidator.number(control.value);
    if (!result.isPotentiallyValid) {
      return {
        creditCard: true
      };
    }

    return null;
  }

  static cvv: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const result = cardValidator.cvv(control.value);
    if (!result.isPotentiallyValid) {
      return {
        cvv: true
      };
    }

    return null;
  }

  static expirationDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const result = cardValidator.expirationDate(control.value);
    if (!result.isPotentiallyValid) {
      return {
        expirationDate: true
      };
    }

    return null;
  }
}
