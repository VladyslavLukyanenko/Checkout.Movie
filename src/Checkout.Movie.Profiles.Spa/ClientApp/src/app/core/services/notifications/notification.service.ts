import {Injectable} from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";
import {OperationStatusMessage} from "./messages.model";

const snackBarConfig = {
  error: {
    panelClass: "error-snackbar",
    verticalPosition: "bottom",
    horizontalPosition: "center",
    duration: 5000
  } as MatSnackBarConfig<any>,
  warn: {
    panelClass: "warn-snackbar",
    verticalPosition: "bottom",
    horizontalPosition: "center",
    duration: 3000
  } as MatSnackBarConfig<any>,
  success: {
    panelClass: "success-snackbar",
    verticalPosition: "bottom",
    horizontalPosition: "center",
    duration: 1500
  } as MatSnackBarConfig<any>
};

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor(
    private readonly snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
  }

  error(message: string | any) {
    this.displayPlainOrOpMessage(message, snackBarConfig.error);
  }

  warn(message: string | any) {
    this.displayPlainOrOpMessage(message, snackBarConfig.warn);
  }

  success(message: string | any) {
    this.displayPlainOrOpMessage(message, snackBarConfig.success, null);
  }

  private displayPlainOrOpMessage(message: string | any, cfg: MatSnackBarConfig<any>, action: string = "Ok") {
    if (message instanceof OperationStatusMessage) {
      this.translate.get(message.messageKey, message.messageArgs)
        .subscribe(m => this.snackBar.open(m, action, cfg));
    } else {
      this.snackBar.open(message, action, cfg);
    }
  }
}
