import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {SharingTokensTableDialogComponent} from "../sharing-tokens-table-dialog/sharing-tokens-table-dialog.component";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {ClipboardService} from "../../../core/services/clipboard.service";
import {ProfilesDomainService} from "../../../core/services/profiles-domain.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ProfileFormGroup} from "../../models/profile.form-group";
import {ProfilesService} from "../../../profiles-api";
import {FormUtil} from "../../../core/services/form.util";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function makeRandom(length: number): string {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

@Component({
  selector: "pst-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent extends DisposableComponentBase implements OnChanges, OnInit {
  @Input()
  profile: ProfileFormGroup;

  @Input() isReadOnly: boolean;

  @Output() removed = new EventEmitter<any>();
  @Output() changed = new EventEmitter<any>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private _accessRequested$ = new BehaviorSubject<boolean>(false);
  accessRequested$: Observable<boolean>;

  constructor(private cd: ChangeDetectorRef,
              private dialog: MatDialog,
              private clipboard: ClipboardService,
              private profilesDomainService: ProfilesDomainService,
              private profilesService: ProfilesService) {
    super();
  }

  get isKeyRemembered(): boolean {
    return this.profilesDomainService.isRemembered(this.profile.id);
  }
  showSharingDetails() {
    const ref = this.dialog.open(SharingTokensTableDialogComponent, {
      data: this.profile,
      width: "80%"
    });
  }

  async update() {
    if (this.profile.invalid) {
      FormUtil.validateAllFormFields(this.profile);
      return;
    }

    await this.asyncTracker.executeAsync(this.profilesDomainService.update(this.profile));
    this.changed.emit();
  }

  async removeCard() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Profile '${this.profile.name}' removal`,
        message: "Are you sure to remove this profile?"
      }
    });
    if (await ref.afterClosed().toPromise()) {
      await this.asyncTracker.executeAsAsync(this.profilesService.profilesDelete(this.profile.id));
      this.removed.emit();
    }
  }

  generateToken() {
    const token = makeRandom(32);
    this.profile.encryptionKeyCtrl.setValue(token);
  }

  copyEncryptionKeyToClipboard() {
    this.clipboard.writeText(this.profile.encryptionKeyCtrl.value);
  }

  toggleEncryption() {
    if (this.profile.isEncrypted) {
      this.profilesDomainService.decrypt(this.profile);
    } else {
      this.profilesDomainService.encrypt(this.profile);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.profile) {
      this.profile.isReadOnly = this.isReadOnly;
    }

    this.checkAccessRequested();
  }

  private checkAccessRequested() {
    const requested = this.profile && this.profile.source.sharingTokens
      .some(_ => _.isRequestedAuthorization && !_.isAccessGranted);
    this._accessRequested$.next(requested);
  }

  ngOnInit(): void {
    this.accessRequested$ = this._accessRequested$.asObservable();

    this.checkAccessRequested();
    const key = this.profilesDomainService.getEncryptionKey(this.profile.id);
    if (key) {
      this.profile.setEncryptionKey(key);
    }
  }

  removeTag(tag: string) {
    this.profile.removeTag(tag);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const tag = (event.value || "").trim();

    if (tag) {
      this.profile.addTag(tag);
    }

    if (input) {
      input.value = "";
    }
  }

  toggleRememberEncryptionKey() {
    if (this.isKeyRemembered) {
      this.profilesDomainService.forgetEncryptionKey(this.profile.id);
    } else {
      this.profilesDomainService.rememberEncryptionKey(this.profile, this.profile.id);
    }
  }
}
