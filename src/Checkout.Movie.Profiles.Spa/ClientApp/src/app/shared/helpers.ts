import { MatButton } from "@angular/material/button";
import {AbstractControl, ValidatorFn} from "@angular/forms";

export namespace Helpers {
  export function stopMatButtonMonitoring(button: MatButton) {
    (<any>button)._focusMonitor.stopMonitoring(button._getHostElement());
  }

  export function values(enumerable) {
    return Object.keys(enumerable).filter(
      (type) => isNaN(<any>type) && type !== "values"
    );
  }

  export function ValueValidator(control: AbstractControl) {
    if (control.value !== undefined && (isNaN(control.value) || control.value < 0)) {
      return null;
    } else {
      return {invalidValue: {value: control.value}};
    }
  }

  export const durationRegEx = /^([0-9][1-9]:[0-5][0-9]:[0-5][0-9])$|^([1-9][0-9]:[0-5][0-9]:[0-5][0-9])$|^([0-9][0-9]:[1-5][0-9]:[0-5][0-9])$|^([0-9][0-9]:[0-5][1-9]:[0-5][0-9])$|^([0-5][0-9]:[0-5][0-9]:[1-5][0-9])$|^([0-9][0-9]:[0-5][0-9]:[0-9][1-9])$/;
}
