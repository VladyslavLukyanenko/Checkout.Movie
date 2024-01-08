import {Component, OnInit} from "@angular/core";
import {IdentityService} from "../../services/identity.service";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {Identity} from "../../services/identity.model";

@Component({
  selector: "pst-profile-widget",
  templateUrl: "./profile-widget.component.html",
  styleUrls: ["./profile-widget.component.scss"]
})
export class ProfileWidgetComponent extends DisposableComponentBase implements OnInit {
  identity: Identity;

  constructor(private identityService: IdentityService) {
    super();
  }

  ngOnInit() {
    this.identityService.currentUser$
      .pipe(this.untilDestroy())
      .subscribe(u => {
      this.identity = u;
    });
  }
}
