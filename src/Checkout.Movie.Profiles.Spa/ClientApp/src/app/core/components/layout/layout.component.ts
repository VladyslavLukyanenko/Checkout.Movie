import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {MediaMatcher} from "@angular/cdk/layout";
import {ToolbarService} from "../../services/toolbar.service";
import {Observable} from "rxjs";

import {Identity} from "../../services/identity.model";
import {IdentityService} from "../../services/identity.service";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: "pst-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends DisposableComponentBase implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  opened: boolean = false;
  mode: string;
  titleToken: string;

  private mobileQueryListener: () => void;
  currentUser$: Observable<Identity>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    media: MediaMatcher,
    private auth: AuthenticationService,
    private toolbarService: ToolbarService,
    private identityService: IdentityService) {
    super();

    this.currentUser$ = identityService.currentUser$;

    this.mobileQuery = media.matchMedia("(max-width: 1080px)");
    this.mobileQueryListener = () => {
      this.mode = this.mobileQuery.matches ? "over" : "side";
      this.opened = !this.mobileQuery.matches;
      changeDetector.detectChanges();
    };

    toolbarService.titleToken$
      .pipe(this.untilDestroy())
      .subscribe(title => this.titleToken = title);

    this.mode = this.mobileQuery.matches ? "over" : "side";
    this.opened = !this.mobileQuery.matches;

    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  get fixedInViewport(): boolean {
    return this.mobileQuery.matches;
  }

  toggleSidenav() {
    this.opened = !this.opened;
    this.changeDetector.detectChanges();
  }

  logOut() {
    this.auth.logOut();
    location.reload();
  }

  async ngOnInit() {
  }

  toggleSidenavOnItemClicked() {
    this.opened = !this.mobileQuery.matches;
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }


  async ngAfterViewInit() {
  }
}

