import {Component, Input} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-mat-error-time-duration-valid",
  templateUrl: "./mat-error-time-duration-valid.component.html",
  styleUrls: ["./mat-error-time-duration-valid.component.scss"]
})
export class MatErrorTimeDurationValidComponent {
  @Input()
  control: AbstractControl;
}
