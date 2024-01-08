import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DiscordCallbackComponent} from "./components/discord-callback/discord-callback.component";

const accountRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "discord/callback",
    component: DiscordCallbackComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}
