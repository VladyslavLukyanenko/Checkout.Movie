import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable, of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

export interface ConfirmDialogData {
  title: string;
  message: string;
  messageParams?: any;
  okText?: string;
  translationProvider?: (key: string, params: any) => Observable<string>;
  cancelText?: string;
}


@Component({
  selector: "pst-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"]
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    private readonly dialog: MatDialogRef<ConfirmDialogComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData
  ) {
  }

  ngOnInit() {
  }

  ok() {
    this.dialog.close(true);
  }

  cancel() {
    this.dialog.close(false);
  }

  translate(key: string, params?: any) {
    const translationProvider = this.data.translationProvider || this.fallbackTranslate;
    if (!translationProvider) {
      return of(key);
    }

    return translationProvider(key, params);
  }

  private fallbackTranslate = (k: string) => this.translateService.get(k);
}
