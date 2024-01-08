import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileData} from "../../profiles-api";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {CreditCardFormGroup} from "./credit-card.form-group";
import {AddressFormGroup} from "./address.form-group";

const excludedKeys = [
  "encryptionKey",
  "encrypted",
];

export class ProfileFormGroup extends FormGroup {
  private _source: ProfileData;
  private _isReadOnly: boolean;
  private _tags$: BehaviorSubject<string[]>;

  constructor(data?: ProfileData) {
    data = data || {};
    data.sharingTokens = data.sharingTokens || [];
    super({
      id: new FormControl(data.id),
      name: new FormControl(data.name, [Validators.required]),
      tags: new FormControl(data.tags || []),
      userId: new FormControl(data.userId),
      areAddressesSame: new FormControl(!!data.areAddressesSame || true),
      creditCard: new CreditCardFormGroup(data.creditCard),
      shippingAddress: new AddressFormGroup(data.shippingAddress),
      billingAddress: new AddressFormGroup(data.billingAddress),
      encryptionKey: new FormControl(null, [Validators.minLength(32), Validators.maxLength(32)]),
      encrypted: new FormControl(!!data.id)
    });

    combineLatest([this.encryptionKeyCtrl.valueChanges, this.encryptedCtrl.valueChanges])
      .subscribe(([key, isEncrypted]) => {
        this.refreshDataLock(key, isEncrypted);
      });

    this.areAddressesSameCtrl.valueChanges
      .subscribe(() => this.refreshAddressesState());

    this.encryptionKeyCtrl.updateValueAndValidity();
    this.encryptedCtrl.updateValueAndValidity();
    this._source = data;
    this._isReadOnly = false;
    this._tags$ = new BehaviorSubject<string[]>(this.tagsCtrl.value);
    this._tags$.subscribe(tags => this.tagsCtrl.patchValue(tags));
    this.tags$ = this._tags$.asObservable();
  }

  tags$: Observable<string[]>;

  addTag(t: string) {
    if (this._tags$.getValue().indexOf(t) !== -1) {
      return;
    }

    this._tags$.next([...this._tags$.getValue(), t]);
  }

  removeTag(toRemove: string) {
    if (!toRemove) {
      return;
    }

    const value = this._tags$.getValue();
    this._tags$.next(value.filter(t => t !== toRemove));
  }

  get source(): ProfileData {
    return this._source;
  }

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  set isReadOnly(value: boolean) {
    this._isReadOnly = value;
    this.refreshDataLock(this.encryptionKeyCtrl.value, this.isEncrypted);
  }

  private refreshDataLock(key, isEncrypted) {
    const controlNames = Object.keys(this.controls);
    for (const cName of controlNames) {
      if (excludedKeys.indexOf(cName) !== -1) {
        continue;
      }

      const c = this.controls[cName];
      if (this.isLocked) {
        c.disable({emitEvent: false});
      } else {
        c.enable({emitEvent: false});
      }

      this.refreshAddressesState();
    }
  }

  get name(): string {
    return this.nameCtrl.value;
  }

  get nameCtrl(): FormControl {
    return this.get("name") as FormControl;
  }

  get tagsCtrl(): FormControl {
    return this.get("tags") as FormControl;
  }

  get isLocked(): boolean {
    return this._isReadOnly || this.id && this.isEncrypted || !this.encryptionKeyCtrl.value || !this.encryptionKeyCtrl.valid;
  }


  get isEncrypted(): boolean {
    return this.encryptedCtrl.value;
  }

  get id(): number {
    return this.get("id").value;
  }

  get areAddressesSameCtrl(): FormControl {
    return this.get("areAddressesSame") as FormControl;
  }

  get billingAddressCtrl(): FormGroup {
    return this.get("billingAddress") as FormGroup;
  }

  get shippingAddressCtrl(): FormGroup {
    return this.get("shippingAddress") as FormGroup;
  }

  get encryptedCtrl(): FormControl {
    return this.get("encrypted") as FormControl;
  }

  get encryptionKeyCtrl(): FormControl {
    return this.get("encryptionKey") as FormControl;
  }

  getProfileValue(): ProfileData {
    const raw = this.getRawValue();
    for (const excl of excludedKeys) {
      delete raw[excl];
    }

    return raw;
  }

  setEncryptedSource(encrypted: ProfileData) {
    this._source = encrypted;
    this.setEncrypted(encrypted);
  }

  setEncrypted(encrypted: ProfileData) {
    this.patchValue(encrypted);
    this.encryptedCtrl.setValue(true);
  }

  setDecrypted(decrypted: ProfileData) {
    this.patchValue(decrypted);
    this.encryptedCtrl.setValue(false);
  }

  private refreshAddressesState(): void {
    if (this.isLocked || this.areAddressesSameCtrl.value) {
      this.billingAddressCtrl.disable({emitEvent: false});
    } else {
      this.billingAddressCtrl.enable({emitEvent: false});
    }
  }

  setEncryptionKey(key: string) {
    this.encryptionKeyCtrl.setValue(key);
  }
}
