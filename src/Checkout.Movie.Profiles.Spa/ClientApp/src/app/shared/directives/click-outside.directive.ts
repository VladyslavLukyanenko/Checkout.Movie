import {Directive, ElementRef, EventEmitter, HostListener, Output} from "@angular/core";

@Directive({
  selector: "[clickOutside]"
})
export class ClickOutsideDirective {
  @Output()
  public clickOutside = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener("document:click", ["$event.target"])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(true);
    } else {
      this.clickOutside.emit(false);
    }
  }
}
