import { AbstractControl } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "pst-mat-error-min-length",
  templateUrl: "./mat-error-min-length.component.html",
  styleUrls: ["./mat-error-min-length.component.scss"]
})
export class MatErrorMinLengthComponent {
  @Input()
  control: AbstractControl;
}
