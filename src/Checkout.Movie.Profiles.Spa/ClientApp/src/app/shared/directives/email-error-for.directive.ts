import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import { MatError } from "@angular/material/form-field";

@Directive({
  selector: "[emailErrorFor]"
})
export class EmailErrorForDirective implements OnInit {

  private _lastCheckResult: boolean = null;

  constructor(
    private element: ElementRef
    , private templateRef: TemplateRef<MatError>
    , private viewContainer: ViewContainerRef
  ) {
  }

  @Input()
  set emailErrorFor(errors: any) {
    const showError = errors && errors.email && !errors.required;
    if (this._lastCheckResult != null && this._lastCheckResult === showError) {
      return;
    }

    this._lastCheckResult = showError;

    if (showError) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.element.nativeElement.innerText = "This is a some text";
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnInit() {
  }

}
