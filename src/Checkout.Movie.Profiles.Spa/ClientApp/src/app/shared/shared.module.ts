import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LayoutModule} from "@angular/cdk/layout";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpLoaderFactory} from "../ngx-translate-http-loader";
import {EmailErrorForDirective} from "./directives/email-error-for.directive";
import {MatErrorEmailComponent} from "./components/mat-error-email/mat-error-email.component";
import {MatErrorRequiredComponent} from "./components/mat-error-required/mat-error-required.component";
import {MatErrorMinLengthComponent} from "./components/mat-error-min-length/mat-error-min-length.component";
import {MatErrorRegisteredEmailComponent} from "./components/mat-error-registered-email/mat-error-registered-email.component";
import {MatErrorCompareComponent} from "./components/mat-error-compare/mat-error-compare.component";
import {RouterModule} from "@angular/router";
import {TransferPanelComponent} from "./components/transfer-panel/transfer-panel.component";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {PromptDialogComponent} from "./components/prompt-dialog/prompt-dialog.component";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {SearchInputComponent} from "./components/search-input/search-input.component";

import {ErrorIsPasswordWeekComponent} from "./components/error-is-password-week/error-is-password-week.component";
import {ErrorIsSlugAvailableComponent} from "./components/error-is-slug-available/error-is-slug-available.component";
import {ErrorGtComponent} from "./components/error-gt/error-gt.component";
import {EnumSelectComponent} from "./components/enum-select/enum-select.component";
import {LocalDatePipe} from "./pipes/LocalDatePipe";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatErrorValidValueComponent} from "./components/mat-error-valid-value/mat-error-valid-value.component";
import {MatErrorPatternComponent} from "./components/mat-error-pattern/mat-error-pattern.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {LayoutHeaderComponent} from "./components/layout-header/layout-header.component";
import {LayoutContentComponent} from "./components/layout-content/layout-content.component";
import {LayoutContentContainerComponent} from "./components/layout-content-container/layout-content-container.component";
import {StarRatingComponent} from "./components/star-rating/star-rating.component";
import {ClickOutsideDirective} from "./directives/click-outside.directive";
import {StarRatingSelectComponent} from "./components/star-rating-select/star-rating-select.component";
import {MatErrorMaxLengthComponent} from "./components/mat-error-max-length/mat-error-max-length.component";
import {TimePickerComponent} from "./components/time-picker/time-picker.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {LightboxCarouselComponent} from "./components/lightbox-carousel/lightbox-carousel.component";
import {MatErrorTimeDurationValidComponent} from "./components/mat-error-time-duration-valid/mat-error-time-duration-valid.component";
import {DateFromNowPipe} from "./pipes/date-from-now.pipe";

const componentsModules = [
  FlexLayoutModule,
  LayoutModule,
  MatSnackBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatTabsModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatBadgeModule,
  DragDropModule,
  ScrollingModule,
];

const sharedSystemModules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule
];

const sharedDeclarations = [
  PromptDialogComponent,
  ConfirmDialogComponent,
  ErrorGtComponent,
  ErrorIsSlugAvailableComponent,

  EmailErrorForDirective,
  ClickOutsideDirective,
  MatErrorEmailComponent,
  MatErrorRequiredComponent,
  MatErrorMinLengthComponent,
  MatErrorMaxLengthComponent,
  MatErrorRegisteredEmailComponent,
  MatErrorCompareComponent,
  MatErrorValidValueComponent,
  MatErrorPatternComponent,

  TransferPanelComponent,
  ErrorIsPasswordWeekComponent,
  TransferPanelComponent,
  SearchInputComponent,
  LocalDatePipe,
  EnumSelectComponent,

  LayoutHeaderComponent,
  LayoutContentComponent,
  LayoutContentContainerComponent,
  StarRatingComponent,
  StarRatingSelectComponent,
  TimePickerComponent,
  FileUploadComponent,
  LightboxCarouselComponent,
  MatErrorTimeDurationValidComponent,
  DateFromNowPipe
];

@NgModule({
  imports: [
    RouterModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    ...sharedSystemModules,
    ...componentsModules
  ],
  declarations: [
    ...sharedDeclarations,
  ],
  entryComponents: [
    PromptDialogComponent,
    ConfirmDialogComponent,
    LightboxCarouselComponent,
  ],
    exports: [
        LocalDatePipe,
        ...sharedSystemModules,
        ...componentsModules,
        ...sharedDeclarations,
        DateFromNowPipe,
    ],
  providers: [
  ]
})
export class SharedModule {
}
