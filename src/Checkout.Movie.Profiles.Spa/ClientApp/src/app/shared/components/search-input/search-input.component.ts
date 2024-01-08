import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/internal/operators";

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchInputComponent),
  multi: true
};


@Component({
  selector: "pst-search-input",
  templateUrl: "./search-input.component.html",
  styleUrls: ["./search-input.component.scss"],
  providers: [customValueProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {
  searchControl: AbstractControl;
  @Output()
  emitSearchValue: EventEmitter<string> = new EventEmitter<string>();
  @Input() defaultText: string = "";

  private lastTouched: boolean;

  constructor() {
    this.searchControl = new FormControl(this.defaultText);
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.emitSearchValue.emit(value);
      });
  }

  registerOnChange(fn: any): void {
    this.searchControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.lastTouched = this.searchControl.touched;
    this.searchControl.statusChanges.subscribe(() => {
      if (this.lastTouched === this.searchControl.touched) {
        return;
      }

      this.lastTouched = this.searchControl.touched;
      fn(this.lastTouched);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
  }
}
