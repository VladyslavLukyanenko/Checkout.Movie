import { MatFormFieldControl } from "@angular/material/form-field";
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";
import { DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Optional, Output, Self, SimpleChanges, Directive } from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {FocusMonitor} from "@angular/cdk/a11y";
import {Subject} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {DisposableComponentBase} from "../components/disposable.component-base";

const noopFn = () => 0;

@Directive()
export class BaseFormField<T>
  extends DisposableComponentBase
  implements OnInit, OnDestroy, OnChanges, DoCheck, MatFormFieldControl<T>, ControlValueAccessor {
  static nextId: number = 0;

  private changeFn: Function = noopFn;
  private touchedFn: Function = noopFn;


  readonly controlType: string = "pst-custom-mat-form-field";
  autofilled: boolean;
  focused: boolean = false;
  control: FormControl = new FormControl();
  private _errorState: boolean = false;
  get errorState(): boolean {
    return this._errorState;
  }

  set errorState(value: boolean) {
    this._errorState = value;
  }


  readonly stateChanges: Subject<void> = new Subject();
  readonly id: string = "pst-form-field" + BaseFormField.nextId++;

  @HostBinding("attr.aria-describedby")
  describedBy: string = "";

  @Output()
  valueChange: EventEmitter<T> = new EventEmitter<T>();
  constructor(
    @Optional() @Self() readonly ngControl: NgControl,
    protected elementRef: ElementRef<HTMLElement>,
    protected focusMonitor: FocusMonitor
  ) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin && !this._disabled;
      this.stateChanges.next();
    });
  }

  protected _value: T;

  @Input()
  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this.setValue(value);
    this.stateChanges.next();
  }

  private _required: boolean = false;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _disabled: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    const opts = {emitEvent: false};
    this._disabled ? this.control.disable(opts) : this.control.enable(opts);
    this.stateChanges.next();
  }

  private _placeholder: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @HostBinding("class.floating")
  get shouldLabelFloat(): boolean {
    return !this.empty || this.focused;
  }

  get empty(): boolean {
    return this.control.value == null || this.control.value === "";
  }

  ngOnInit() {
    this.control.valueChanges
      .pipe(
        distinctUntilChanged(),
        this.untilDestroy()
      )
      .subscribe((newValue: T) => {
        this.setValueAndDispatch(newValue);
      });

    // this.stateChanges.asObservable().subscribe(() => this.touchedFn());
  }

  private setValueAndDispatch(newValue: T) {
    if (this.value === newValue) {
      return;
    }

    this.value = newValue;
    this.changeFn(this.value);
    this.valueChange.emit(this.value);
  }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(newValue: T): void {
    if (newValue === this.value) {
      return;
    }

    // this._value = newValue;

    this.setValue(newValue);
  }

  onContainerClick(event: MouseEvent): void {
    this.touchedFn();
    if ((event.target as Element).tagName.toLowerCase() !== "input") {
      const inputElement = this.elementRef.nativeElement.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(" ");
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchControlValue(this.value);
  }

  protected patchControlValue(newValue: T) {
    this.control.patchValue(newValue, {emitEvent: false});
  }

  dispatchValueChange(newValue: T) {
    this.patchControlValue(newValue);
    this.setValueAndDispatch(newValue);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  protected setValue(value: T) {
    this._value = value;
    this.patchControlValue(value);
  }
}
