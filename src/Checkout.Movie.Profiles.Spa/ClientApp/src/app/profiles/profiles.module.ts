import {NgModule} from "@angular/core";
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {SharedModule} from "../shared/shared.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpLoaderFactory} from "../ngx-translate-http-loader";
import {HttpClient} from "@angular/common/http";
import {ProfilesListPageComponent} from "./components/profiles-list-page/profiles-list-page.component";
import {SharingTokensTableComponent} from "./components/sharing-tokens-table/sharing-tokens-table.component";
import {SharingTokensTableDialogComponent} from "./components/sharing-tokens-table-dialog/sharing-tokens-table-dialog.component";
import {SharedProfileComponent} from "./components/shared-profile/shared-profile.component";
import {SharedProfilePageComponent} from "./components/shared-profile-page/shared-profile-page.component";
import {AddressComponent} from "./components/address/address.component";
import {CreditCardComponent} from "./components/credit-card/credit-card.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {ProfileDialogComponent} from "./components/profile-dialog/profile-dialog.component";

@NgModule({
  imports: [
    SharedModule,
    ProfilesRoutingModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    ProfilesListPageComponent,
    ProfileComponent,
    ProfileDialogComponent,
    SharingTokensTableComponent,
    SharingTokensTableDialogComponent,
    SharedProfileComponent,
    SharedProfilePageComponent,
    AddressComponent,
    CreditCardComponent
  ]
})
export class ProfilesModule {
}
