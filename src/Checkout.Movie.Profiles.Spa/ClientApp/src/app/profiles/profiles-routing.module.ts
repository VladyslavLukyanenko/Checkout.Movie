import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfilesListPageComponent} from "./components/profiles-list-page/profiles-list-page.component";
import {AuthenticatedGuard} from "../core/services/guards";
import {SharedProfilePageComponent} from "./components/shared-profile-page/shared-profile-page.component";
import {LayoutComponent} from "../core/components/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: "",
        component: ProfilesListPageComponent,
      }

    ]
  },
  {
    path: "shared",
    component: SharedProfilePageComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfilesRoutingModule {
}
