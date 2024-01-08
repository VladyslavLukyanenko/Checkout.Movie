import {RouterModule} from "@angular/router";
import {NgModule, Optional, SkipSelf} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import {LayoutComponent} from "./components/layout/layout.component";

import {httpLoaderFactory} from "../ngx-translate-http-loader";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {SharedModule} from "../shared/shared.module";

import {MenuComponent} from "./components/menu/menu.component";
import {MenuItemComponent} from "./components/menu-item/menu-item.component";
import {MainMenuComponent} from "./components/main-menu/main-menu.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {ProfileWidgetComponent} from "./components/profile-widget/profile-widget.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    RouterModule,
    BrowserAnimationsModule,

    SharedModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    LayoutComponent,

    MenuComponent,
    MenuItemComponent,
    MainMenuComponent,
    ToolbarComponent,
    ProfileWidgetComponent,
  ],
  exports: [LayoutComponent],
  entryComponents: [
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
