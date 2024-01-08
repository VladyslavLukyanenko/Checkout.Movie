import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-error-gt",
  templateUrl: "./error-gt.component.html",
  styleUrls: ["./error-gt.component.scss"]
})
export class ErrorGtComponent implements OnInit {

  @Input()
  control: AbstractControl;

  @Input()
  minValue: any;

  constructor() { }

  ngOnInit() {
  }

}
