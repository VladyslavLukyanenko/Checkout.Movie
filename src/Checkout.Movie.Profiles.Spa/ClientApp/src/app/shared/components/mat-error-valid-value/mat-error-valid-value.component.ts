import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {Helpers} from "../../helpers";

@Component({
  selector: "pst-mat-error-valid-value",
  templateUrl: "./mat-error-valid-value.component.html",
  styleUrls: ["./mat-error-valid-value.component.scss"]
})
export class MatErrorValidValueComponent implements OnInit {
  helpers = Helpers;
  constructor() {
  }

  @Input()
  control: AbstractControl;

  ngOnInit() {
  }
}
