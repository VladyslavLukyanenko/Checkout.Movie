import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";
import {DisposableComponentBase} from "../disposable.component-base";
import {map} from "rxjs/operators";

@Component({
  selector: "pst-mat-error-max-length",
  templateUrl: "./mat-error-max-length.component.html",
  styleUrls: ["./mat-error-max-length.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatErrorMaxLengthComponent extends DisposableComponentBase implements OnInit {
  @Input()
  control: AbstractControl;

  hasError$: Observable<boolean>;

  ngOnInit(): void {
    this.hasError$ = this.control.statusChanges
      .pipe(
        this.untilDestroy(),
        map(() => this.control.hasError("maxlength") && !this.control.hasError("required"))
      );
  }
}
