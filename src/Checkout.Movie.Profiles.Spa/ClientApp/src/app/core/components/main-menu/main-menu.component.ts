import {Component, EventEmitter, HostListener, Output} from "@angular/core";
import {Identity} from "../../services/identity.model";
import {IdentityService} from "../../services/identity.service";
import {slideToggle} from "../../../shared/animations";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";

@Component({
  selector: "pst-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.scss"],
  animations: [slideToggle]
})
export class MainMenuComponent extends DisposableComponentBase {
  user: Identity;

  @Output()
  toggleSidenav: EventEmitter<any> = new EventEmitter<any>();

  @HostListener("document:click", ["$event"])
  handleClick(event) {
    if (event.target.classList.contains("menu-link")) {
      if (event.target.children.length && event.target.children.namedItem("arrow-right")) {
        return;
      } else {
        this.toggleSidenav.emit();
      }
    }
  }

  constructor(private readonly userService: IdentityService
  ) {
    super();
    this.userService.currentUser$
      .pipe(this.untilDestroy())
      .subscribe((user: Identity) => {
        this.user = user;
      });
  }
}
