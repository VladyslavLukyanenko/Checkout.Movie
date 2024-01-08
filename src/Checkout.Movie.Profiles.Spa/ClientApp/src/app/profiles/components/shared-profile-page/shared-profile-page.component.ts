import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {distinctUntilChanged, map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {CacheService} from "../../../core/services/cache.service";
import {NotificationService} from "../../../core/services/notifications/notification.service";
import {ProfileFormGroup} from "../../models/profile.form-group";
import {ProfilesService, SharingTokenService} from "../../../profiles-api";

@Component({
  selector: "pst-shared-profile-page",
  templateUrl: "./shared-profile-page.component.html",
  styleUrls: ["./shared-profile-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedProfilePageComponent extends DisposableComponentBase implements OnInit {
  private _profile$ = new BehaviorSubject<ProfileFormGroup>(new ProfileFormGroup());
  private _requiresAuthorization$ = new BehaviorSubject<boolean>(false);
  private _isTokenInvalid$ = new BehaviorSubject<boolean>(false);
  private _requestedAccessDate$ = new BehaviorSubject<Date>(null);

  profile$: Observable<ProfileFormGroup>;
  profileFound$: Observable<boolean>;
  requiresAuthorization$: Observable<boolean>;
  isTokenInvalid$: Observable<boolean>;
  requestedAccessDate$: Observable<Date>;
  sharingToken = new FormControl();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private cache: CacheService,
              private sharingTokenService: SharingTokenService,
              private notifications: NotificationService,
              private profilesService: ProfilesService) {
    super();
  }

  async ngOnInit() {
    this.requiresAuthorization$ = this._requiresAuthorization$.asObservable();
    this.isTokenInvalid$ = this._isTokenInvalid$.asObservable();
    this.requestedAccessDate$ = this._requestedAccessDate$.asObservable();
    this.profile$ = this._profile$.asObservable()
      .pipe(distinctUntilChanged());

    this.profileFound$ = this.profile$
      .pipe(
        map(c => !!c),
        distinctUntilChanged()
      );

    this.sharingToken.valueChanges
      .pipe(this.untilDestroy())
      .subscribe(value => {
        this.router.navigate([], {queryParams: {token: value}, relativeTo: this.activatedRoute});
      });

    this.activatedRoute.queryParamMap
      .pipe(this.untilDestroy())
      .subscribe(async paramsMap => {
        this._requiresAuthorization$.next(false);
        this._isTokenInvalid$.next(false);
        this._requestedAccessDate$.next(null);


        const token = paramsMap.get("token");
        if (!token) {
          this._profile$.getValue().setEncrypted({});
        } else {
          try {
            this.sharingToken.setValue(token, {emitEvent: false});
            const profile = await this.asyncTracker.executeAsAsync(this.profilesService.profilesGetShared(token));
            this._profile$.getValue().setEncryptedSource(profile.payload);
          } catch (e) {
            if (e.status === 404) {
              this._isTokenInvalid$.next(true);
              this.notifications.warn("This token is invalid. Is no exist or owner rejected it");
            } else if (e.status === 403) {
              this._requiresAuthorization$.next(true);
              this.notifications.warn("Access to the profile not granted yet. If you already requested it - please until owner authorize");
              this.checkAccessRequested();
            }
          }
        }
      });

  }

  private checkAccessRequested() {
    const requestedDate = this.cache.getItem<number>(this.getAccessRequestedStoreKey());
    if (requestedDate) {
      this._requestedAccessDate$.next(new Date(requestedDate));
    }
  }

  async requestAuthorization() {
    try {
      await this.executeAsAsync(this.sharingTokenService.sharingTokenRequestAuthorization(this.sharingToken.value));
      this.notifications.success("Access was requested. Please wait until owner authorize access to the profile");
      this.cache.setItem(this.getAccessRequestedStoreKey(), Date.now());
      this.checkAccessRequested();
    } catch (e) {
      if (e.status === 400) {
        this.notifications.warn(e.error.payload);
      }
    }
  }

  private getAccessRequestedStoreKey() {
    return `movie.checkout.profiles.access-requested.${this.sharingToken.value}`;
  }

}
