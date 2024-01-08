import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-mat-error-required",
  templateUrl: "./mat-error-required.component.html",
  styleUrls: ["./mat-error-required.component.scss"]
})
export class MatErrorRequiredComponent implements OnInit {

  constructor() { }

  @Input()
  control: AbstractControl;

  ngOnInit() {
  }
}
