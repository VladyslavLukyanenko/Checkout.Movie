import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: "pst-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: StarRatingComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  isReadOnly: boolean;

  @Input()
  value: number = 1;

  @Input()
  size: number;

  @Input()
  maxStars: number = 5;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter<number>();

  private hoverIdx: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private onChange: Function;

  state: BehaviorSubject<StarRatingState> = new BehaviorSubject<StarRatingState>({
    emptyStars: [],
    filledStars: []
  });

  constructor() { }

  get hoveredIdx$(): Observable<number> {
    return this.hoverIdx.asObservable();
  }

  get filledCount(): number {
    return this.state.getValue().filledStars.length;
  }

  @HostListener("mouseleave")
  resetHover() {
    this.hoverIdx.next(-1);
  }

  ngOnInit() {
    this.updateState();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.updateState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateState();
  }

  private updateState() {
    const filledStars = new Array(Math.min(this.maxStars, this.value));
    const emptyStars = new Array(Math.min(this.maxStars, this.maxStars - this.value));
    this.state.next({
      filledStars,
      emptyStars
    });
  }

  trySetHoveIdx(idx: number) {
    if (this.isReadOnly) {
      return;
    }

    this.hoverIdx.next(idx);
  }

  dispatchValueChange(idx: number) {
    if (this.isReadOnly) {
      return;
    }

    const value = idx + 1;
    this.valueChange.emit(value);
    if (this.onChange) {
      this.onChange(value);

      // NOTICE: this means that we works over reactive/template forms and we need to keep selected value
      this.value = value;
      this.updateState();
    }
  }
}

interface StarRatingState {
  filledStars: any[];
  emptyStars: any[];
}
