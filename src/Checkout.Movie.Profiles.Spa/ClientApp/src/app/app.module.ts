import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from "./app-routing.module";

import {CoreModule} from "./core/core.module";


import {AppComponent} from "./app.component";
import {HostComponent} from "./host.component";
import {httpLoaderFactory} from "./ngx-translate-http-loader";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {SharedModule} from "./shared/shared.module";
import {TokenService} from "./core/services/token.service";
import {environment} from "../environments/environment";
import {BASE_PATH} from "./profiles-api";

@NgModule({
  declarations: [
    AppComponent,
    HostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: "ng-cli-universal"}),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,

    CoreModule,
    SharedModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: BASE_PATH, useValue: environment.apiHostUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function jwtOptionsFactory(auth: TokenService) {
  return {
    tokenGetter: () => auth.encodedAccessToken,
    skipWhenExpired: true,
    whitelistedDomains: [
      /.*/
    ]
  };
}

