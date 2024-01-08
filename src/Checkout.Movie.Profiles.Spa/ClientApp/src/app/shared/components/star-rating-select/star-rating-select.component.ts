import {ChangeDetectionStrategy, Component, ElementRef, Input, Optional, Self} from "@angular/core";
import {BaseFormField} from "../../models/base-form-field.model";
import { MatFormFieldControl } from "@angular/material/form-field";
import {NgControl} from "@angular/forms";
import {FocusMonitor} from "@angular/cdk/a11y";

@Component({
  selector: "pst-star-rating-select",
  templateUrl: "./star-rating-select.component.html",
  styleUrls: ["./star-rating-select.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MatFormFieldControl,
    useExisting: StarRatingSelectComponent
  }]
})
export class StarRatingSelectComponent extends BaseFormField<number> {
  private _maxValue: number;

  @Input()
  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(value: number) {
    this._maxValue = value;
    this.availableRatings = new Array(value);
  }

  availableRatings: number[] = [];

  constructor(
    @Optional() @Self() ngControl: NgControl,
    elementRef: ElementRef<HTMLElement>,
    focusMonitor: FocusMonitor
  ) {
    super(ngControl, elementRef, focusMonitor);
    this.maxValue = 5;
  }
}
