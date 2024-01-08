import {NgModule} from "@angular/core";

import {LoginComponent} from "./components/login/login.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {AccountRoutingModule} from "./account-routing.module";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpLoaderFactory} from "../ngx-translate-http-loader";
import {SharedModule} from "../shared/shared.module";
import { DiscordCallbackComponent } from "./components/discord-callback/discord-callback.component";

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    DiscordCallbackComponent
  ],
  providers: [],

  entryComponents: [
  ],
  // exports: [
  //   accountRouting
  // ]
})
export class AccountModule {
}
