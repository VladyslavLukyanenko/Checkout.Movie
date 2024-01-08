import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-mat-error-pattern",
  templateUrl: "./mat-error-pattern.component.html",
  styleUrls: ["./mat-error-pattern.component.scss"]
})
export class MatErrorPatternComponent implements OnInit {
  @Input()
  control: AbstractControl;

  @Input()
  errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
