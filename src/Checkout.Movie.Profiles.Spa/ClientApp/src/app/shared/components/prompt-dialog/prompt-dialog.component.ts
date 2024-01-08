import {Component, Inject, OnInit} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";

@Component({
  selector: "pst-prompt-dialog",
  templateUrl: "./prompt-dialog.component.html",
  styleUrls: ["./prompt-dialog.component.scss"]
})
export class PromptDialogComponent implements OnInit {
  answer: FormControl = new FormControl("", [Validators.required]);

  constructor(private dialogRef: MatDialogRef<PromptDialogComponent>,
              @Inject(MAT_DIALOG_DATA) readonly config: PromptConfig) {
  }

  ngOnInit() {
    this.answer.patchValue(this.config.defaultValue || "");
  }

  ok() {
    if (!this.answer.valid) {
      return;
    }

    this.dialogRef.close(this.answer.value);
  }

  cancel() {
    this.dialogRef.close(false);
  }

  translate(key: string, params?: any) {
    if (!this.config.translationProvider) {
      return of(key);
    }

    return this.config.translationProvider(key, params);
  }
}

export interface PromptConfig {
  title: string;
  message: string;
  messageParams?: any;
  defaultValue?: string;
  translationProvider?: (key: string, params: any) => Observable<string>;
  yesText?: string;
  cancelText?: string;
}
