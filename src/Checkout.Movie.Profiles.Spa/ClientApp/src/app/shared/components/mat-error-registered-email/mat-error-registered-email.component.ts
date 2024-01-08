import { AbstractControl } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "pst-mat-error-registered-email",
  templateUrl: "./mat-error-registered-email.component.html",
  styleUrls: ["./mat-error-registered-email.component.scss"]
})
export class MatErrorRegisteredEmailComponent implements OnInit {

  constructor() { }

  @Input()
  control: AbstractControl;

  ngOnInit() {
  }

}
