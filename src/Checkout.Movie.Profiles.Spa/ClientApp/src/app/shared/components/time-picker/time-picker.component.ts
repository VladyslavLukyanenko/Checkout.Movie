import {Component, OnInit, ChangeDetectionStrategy, Optional, Self, ElementRef, Input} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import * as moment from "moment";
import {Moment} from "moment";
import {BaseFormField} from "../../models/base-form-field.model";
import {NgControl} from "@angular/forms";
import {FocusMonitor} from "@angular/cdk/a11y";
import { MatFormFieldControl } from "@angular/material/form-field";
import {filter, map} from "rxjs/operators";


interface Time {
  value: string;
  displayValue: string;
}
export const TIME_VALUE_FORMAT = "HH:mm:ssZ";
export const TIME_DISPLAY_FORMAT = "HH:mm";
@Component({
  selector: "pst-time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: TimePickerComponent
    }
  ]
})
export class TimePickerComponent extends BaseFormField<string> implements OnInit {
  timeOptions$: BehaviorSubject<Time[]> = new BehaviorSubject<Time[]>([]);

  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  filteredOptions$: Observable<Time[]>;
  constructor(
    @Optional() @Self() ngControl: NgControl,
    elementRef: ElementRef<HTMLElement>,
    focusMonitor: FocusMonitor) {
    super(ngControl, elementRef, focusMonitor);
  }

  timeValueAccessor = (t: Time) => t.value;
  timeValueCompareFn = (l: Time, r: Time) => l && r && l.value === r.value;

  ngOnInit() {
    this.filteredOptions$ = combineLatest([this.searchTerm$, this.timeOptions$])
      .pipe(
        this.untilDestroy(),
        map(([s, items]) => !s ? items : items.filter(i => i.displayValue.indexOf(s) > -1))
      );
    const start = moment().startOf("day");
    const step = 15;
    let current: Moment = null;
    const begin = performance.now();
    const options: Time[] = [];
    do {
      current = start.clone();
      start.add(step, "minutes");
      options.push({
        value: current.format(TIME_VALUE_FORMAT),
        displayValue: current.format(TIME_DISPLAY_FORMAT)
      });
    } while (current.isSame(start, "day"));
    const end = performance.now();
    this.timeOptions$.next(options);
    console.log(`Time options generated in ${end - begin}ms`);
  }

  search(searchTerm: string) {
    this.searchTerm$.next(searchTerm);
  }

  writeValue(newValue: string): void {
    super.writeValue(moment(newValue, TIME_VALUE_FORMAT).format(TIME_VALUE_FORMAT));
  }
}
