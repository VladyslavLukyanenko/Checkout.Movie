import {ChangeDetectionStrategy, Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProfileFormGroup} from "../../models/profile.form-group";

@Component({
  selector: "pst-sharing-tokens-table-dialog",
  templateUrl: "./sharing-tokens-table-dialog.component.html",
  styleUrls: ["./sharing-tokens-table-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharingTokensTableDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) readonly profile: ProfileFormGroup) { }

  ngOnInit(): void {
  }

}
