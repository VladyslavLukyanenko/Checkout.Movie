import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {DiscordLoginProvider} from "../../services/discord.login-provider";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../core/services/notifications/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesProvider} from "../../../core/services/routes.provider";

@Component({
  selector: "pst-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent extends DisposableComponentBase implements OnInit, OnDestroy {

  private _discordDispose: Subscription;

  constructor(private discordAuth: DiscordLoginProvider,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private routesProvider: RoutesProvider) {
    super();
  }

  ngOnInit() {
    this._discordDispose = this.discordAuth.initialize();
  }

  async login() {
    const r = await this.discordAuth.performLogin();
    if (r) {
      await this.router.navigate(this.routesProvider.getAuthenticatedRedirectUrl(), {relativeTo: this.activatedRoute.root});
    } else {
      this.notificationService.error("Can't login. Please try again or contact support.");
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this._discordDispose) {
      this._discordDispose.unsubscribe();
    }
  }
}
