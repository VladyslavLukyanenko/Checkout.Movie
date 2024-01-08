import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ToolbarService} from "../../../core/services/toolbar.service";
import {NotificationService} from "../../../core/services/notifications/notification.service";
import {ProfilesDomainService} from "../../../core/services/profiles-domain.service";
import {ProfileFormGroup} from "../../models/profile.form-group";
import {ProfileData, ProfilesService} from "../../../profiles-api";
import {ProfileDialogComponent} from "../profile-dialog/profile-dialog.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "pst-cards-list-page",
  templateUrl: "./profiles-list-page.component.html",
  styleUrls: ["./profiles-list-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilesListPageComponent extends DisposableComponentBase implements OnInit {
  private _profiles$ = new BehaviorSubject<ProfileData[]>([]);
  profiles$: Observable<ProfileFormGroup[]>;
  tags$: Observable<string[]>;
  noProfilesExists$: Observable<boolean>;
  nothingFound$: Observable<boolean>;
  profilesListVisible$: Observable<boolean>;
  filtersForm: FormGroup;

  constructor(private profilesService: ProfilesService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private profilesDomainService: ProfilesDomainService,
              private notifications: NotificationService,
              private toolbar: ToolbarService) {
    super();
    this.toolbar.setTitle("Profiles List");
  }

  async ngOnInit() {
    const searchCtrl = new FormControl();
    const tagsCtrl = new FormControl([]);
    this.filtersForm = this.fb.group({
      searchTerm: searchCtrl,
      tags: tagsCtrl
    });

    this.profiles$ = combineLatest([this._profiles$, this.activatedRoute.queryParams])
      .pipe(
        this.untilDestroy(),
        map(([c, filters]) => c.filter(_ => {
          let matches = true;
          if (searchCtrl.value) {
            matches = matches && _.name.toLowerCase().indexOf(searchCtrl.value.toLowerCase()) !== -1;
          }

          if (tagsCtrl.value.length) {
            matches = matches && _.tags.some(t => tagsCtrl.value.some(st => t === st));
          }

          return matches;
        }).map(r => new ProfileFormGroup(r)))
      );

    this.nothingFound$ = combineLatest([this._profiles$, this.profiles$])
      .pipe(map(([all, filtered]) => !!all.length && !filtered.length));


    this.activatedRoute.queryParamMap
      .pipe(
        this.untilDestroy()
      )
      .subscribe(paramsMap => {
        const searchTerm = paramsMap.get("searchTerm");
        const tags = (paramsMap.get("tags") || "").split(",").filter(i => !!i);
        this.filtersForm.patchValue({
          searchTerm: searchTerm,
          tags: tags
        });
      });

    this.noProfilesExists$ = combineLatest([this._profiles$, this.asyncTracker.isLoading$])
      .pipe(
        this.untilDestroy(),
        map(([cards, isLoading]) => !isLoading && !cards.length)
      );

    this.tags$ = this._profiles$.asObservable()
      .pipe(
        map(profiles => {
          let tags = [];
          for (const p of profiles) {
            const unique = p.tags.filter(t => tags.indexOf(t) === -1);
            tags = tags.concat(unique);
          }

          return tags;
        })
      );


    this.filtersForm.valueChanges
      .pipe(
        debounceTime(300),
        this.untilDestroy(),
        map(filters => ({
          searchTerm: filters.searchTerm || null,
          tags: filters.tags.join(",") || null
        })),
        distinctUntilChanged((l, r) => l.searchTerm === r.searchTerm && l.tags === r.tags)
      )
      .subscribe(filters => {
        this.router.navigate([], {queryParams: filters, relativeTo: this.activatedRoute});
      });

    this.profilesListVisible$ = combineLatest([this.nothingFound$, this.noProfilesExists$, this.asyncTracker.isLoading$])
      .pipe(
        map(([nothing, noProfiles, isLoading]) => {
          return !nothing && !noProfiles && !isLoading;
        })
      );

    await this.refreshProfilesList();
  }

  trackById = (idx: number, p: ProfileFormGroup) => p.id;

  async refreshProfilesList() {
    const c = await this.asyncTracker.executeAsAsync(this.profilesService.profilesGetList());
    this._profiles$.next(c.payload);
  }

  async create() {
    const dialogRef = this.dialog.open(ProfileDialogComponent);
    const created: boolean = await dialogRef.afterClosed().toPromise();
    if (created) {
      await this.refreshProfilesList();
      this.notifications.success("New card created successfully");
    }
  }

  clearSearch() {
    this.filtersForm.patchValue({
      searchTerm: null
    });
  }
}
