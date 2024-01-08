import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {DateUtil} from "../../../core/services/date.util";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {ClipboardService} from "../../../core/services/clipboard.service";
import {NotificationService} from "../../../core/services/notifications/notification.service";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {ProfileSharingTokenData, SharingTokenService} from "../../../profiles-api";
import {MAT_CHECKBOX_CLICK_ACTION} from "@angular/material/checkbox";

@Component({
  selector: "pst-sharing-tokens-table",
  templateUrl: "./sharing-tokens-table.component.html",
  styleUrls: ["./sharing-tokens-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "noop"}
  ]
})
export class SharingTokensTableComponent extends DisposableComponentBase implements OnInit {
  @Input()
  profileId: number;

  private _tokens$ = new BehaviorSubject<ProfileSharingTokenData[]>([]);

  constructor(private sharingTokensService: SharingTokenService,
              private clipboardService: ClipboardService,
              private dialog: MatDialog,
              private notifications: NotificationService) {
    super();
  }

  tokens$: Observable<ProfileSharingTokenData[]>;
  noData$: Observable<boolean>;

  displayedColumns: string[] = [
    "token",
    "requiresAuthorization",
    "Access",
    "options"
  ];

  async ngOnInit() {
    this.tokens$ = this._tokens$.asObservable();
    this.noData$ = combineLatest([this.tokens$, this.asyncTracker.isLoading$])
      .pipe(
        this.untilDestroy(),
        map(([data, isLoading]) => !isLoading && !data.length)
      );

    await this.refreshTokens();
  }

  formatDate(grantedAccessAt: any): string {
    return DateUtil.fromNow(grantedAccessAt);
  }

  async toggleRequiresAuthorization(element: ProfileSharingTokenData) {
    element.requiresAuthorization = !element.requiresAuthorization;
    await this.asyncTracker.executeAsAsync(this.sharingTokensService.sharingTokenUpdate(element.id, element));
    await this.refreshTokens();
  }

  async grant(element: ProfileSharingTokenData) {
    await this.asyncTracker.executeAsAsync(this.sharingTokensService.sharingTokenGrant(element.id));
    await this.refreshTokens();
  }

  async remove(element: ProfileSharingTokenData) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Sharing token removal`,
        message: "Are you sure to remove this token?"
      }
    });
    if (await ref.afterClosed().toPromise()) {
      await this.asyncTracker.executeAsAsync(this.sharingTokensService.sharingTokenDelete(element.id));
      await this.refreshTokens();
    }
  }

  async addSharingToken() {
    const payload: ProfileSharingTokenData = {
      profileId: this.profileId
    };

    await this.asyncTracker.executeAsAsync(this.sharingTokensService.sharingTokenCreate(payload));
    await this.refreshTokens();
  }

  private async refreshTokens() {
    const resp = await this.asyncTracker
      .executeAsAsync(this.sharingTokensService.sharingTokenGetSharingTokens(this.profileId));
    this._tokens$.next(resp.payload);
  }

  copySharingUrlToClipboard(element: ProfileSharingTokenData) {
    const url = location.origin + `/profiles/shared?token=${element.token}`;
    this.clipboardService.writeText(url);
    this.notifications.success("Sharing URL was copied to clipboard.");
  }
}
