import {Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: "pst-error-is-slug-available",
  templateUrl: "./error-is-slug-available.component.html",
  styleUrls: ["./error-is-slug-available.component.scss"]
})
export class ErrorIsSlugAvailableComponent implements OnInit {

  @Input()
  control: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

}
