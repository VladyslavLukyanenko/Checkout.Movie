import {AbstractControl} from "@angular/forms";
import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: "pst-mat-error-compare",
  templateUrl: "./mat-error-compare.component.html",
  styleUrls: ["./mat-error-compare.component.scss"]
})
export class MatErrorCompareComponent implements OnInit {

  @Input()
  control: AbstractControl;

  @Input()
  comparedControlName: string;

  constructor() {
  }

  ngOnInit() {
  }
}
