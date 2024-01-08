import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-mat-error-email",
  templateUrl: "./mat-error-email.component.html",
  styleUrls: ["./mat-error-email.component.scss"]
})
export class MatErrorEmailComponent implements OnInit {

  constructor() { }

  @Input()
  control: AbstractControl;

  ngOnInit() {
  }

}
