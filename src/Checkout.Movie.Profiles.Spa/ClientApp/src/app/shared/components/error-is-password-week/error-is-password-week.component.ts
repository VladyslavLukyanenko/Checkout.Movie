import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-error-is-password-week",
  templateUrl: "./error-is-password-week.component.html",
  styleUrls: ["./error-is-password-week.component.scss"]
})
export class ErrorIsPasswordWeekComponent implements OnInit {

  @Input()
  control: AbstractControl;

  constructor() {
  }

  ngOnInit() {
  }

}
