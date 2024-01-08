import {Component, ElementRef, Input, Optional, Self} from "@angular/core";
import {NgControl} from "@angular/forms";
import {Helpers} from "../../helpers";
import {BaseFormField} from "../../models/base-form-field.model";
import {FocusMonitor} from "@angular/cdk/a11y";
import { MatFormFieldControl } from "@angular/material/form-field";

@Component({
  selector: "pst-enum-select",
  templateUrl: "./enum-select.component.html",
  styleUrls: ["./enum-select.component.scss"],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: EnumSelectComponent
  }]
})
export class EnumSelectComponent extends BaseFormField<number> {
  helpers = Helpers;
  @Input() enum: any;

  @Input()
  noneText: string = "dashboard.header.select.None";

  @Input()
  multiple: boolean = false;

  @Input()
  translationPath: string = "";

  constructor(@Optional() @Self() ngControl: NgControl,
              elementRef: ElementRef<HTMLElement>,
              focusMonitor: FocusMonitor) {
    super(ngControl, elementRef, focusMonitor);
  }
}
