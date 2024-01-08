import {ChangeDetectionStrategy, Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileFormGroup} from "../../models/profile.form-group";
import {ProfileData} from "../../../profiles-api";
import {FormUtil} from "../../../core/services/form.util";
import {AsyncProgressTracker} from "../../../shared/models/async-progress-tracker.model";
import {ProfilesDomainService} from "../../../core/services/profiles-domain.service";

@Component({
  selector: "pst-profile-dialog",
  templateUrl: "./profile-dialog.component.html",
  styleUrls: ["./profile-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDialogComponent implements OnInit {
  form: ProfileFormGroup;
  asyncTracker = new AsyncProgressTracker();
  constructor(private dialogRef: MatDialogRef<ProfileDialogComponent>,
              private profilesDomainService: ProfilesDomainService,
              @Inject(MAT_DIALOG_DATA) public data: ProfileData) { }

  ngOnInit(): void {
    this.form = new ProfileFormGroup(this.data || {} as any);
  }

  async submit() {
    if (this.form.invalid) {
      FormUtil.validateAllFormFields(this.form);
      return;
    }

    const createdId = await this.asyncTracker.executeAsync(this.profilesDomainService.create(this.form));
    this.profilesDomainService.rememberEncryptionKey(this.form, createdId);
    this.dialogRef.close(true);
  }
}
