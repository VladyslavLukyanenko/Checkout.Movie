import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HostComponent} from "./host.component";
import {NotAuthenticatedGuard} from "./core/services/guards";

const appRoutes: Routes = [
  {
    path: "",
    component: HostComponent,
    runGuardsAndResolvers: "always",
    children: [
      {path: "", redirectTo: "login", pathMatch: "full"},
      {
        path: "login",
        canActivateChild: [NotAuthenticatedGuard],
        loadChildren: () => import("./account/account.module").then(_ => _.AccountModule)
      },
      {
        path: "profiles",
        runGuardsAndResolvers: "always",
        loadChildren: () => import("./profiles/profiles.module").then(_ => _.ProfilesModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: "reload"})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
