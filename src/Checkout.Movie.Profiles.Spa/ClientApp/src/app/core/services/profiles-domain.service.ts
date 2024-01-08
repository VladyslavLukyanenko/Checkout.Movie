import {Injectable} from "@angular/core";
import {CryptoService} from "./crypto.service";
import {ProfileFormGroup} from "../../profiles/models/profile.form-group";
import {ProfilesService} from "../../profiles-api";

const encryptionStoreKeyFactory = id => `movie.checkout.profiles.encryptionkeys.${id}`;

const skipProps = [
  "id",
  "name",
  "areAddressesSame",
  "userId",
  "tags"
];

@Injectable({
  providedIn: "root"
})
export class ProfilesDomainService {
  constructor(private profilesService: ProfilesService,
              private cryptoService: CryptoService) {
  }

  async create(profile: ProfileFormGroup): Promise<number> {
    const data = this.getEncryptedData(profile);

    const r = await this.profilesService.profilesCreate(data).toPromise();
    return r.payload;
  }

  async update(profile: ProfileFormGroup): Promise<void> {
    const data = this.getEncryptedData(profile);

    await this.profilesService.profilesUpdate(data.id, data).toPromise();
  }

  encrypt(profile: ProfileFormGroup) {
    const encrypted = this.getEncryptedData(profile);
    profile.setEncrypted(encrypted);
  }

  decrypt(profile: ProfileFormGroup) {
    const decrypted = this.getDecryptedData(profile);
    profile.setDecrypted(decrypted);
  }

  private getEncryptedData(profile: ProfileFormGroup) {
    const data = profile.getProfileValue();
    const pwd = profile.encryptionKeyCtrl.value;
    if (!profile.isEncrypted) {
      this.process(data, (c) => this.cryptoService.encode(c || "", pwd));
    }

    return data;
  }

  private getDecryptedData(profile: ProfileFormGroup) {
    const data = profile.getProfileValue();
    const pwd = profile.encryptionKeyCtrl.value;
    if (profile.isEncrypted) {
      this.process(data, (c) => this.cryptoService.decode(c || "", pwd));
    }

    return data;
  }

  private process(data: any, processor: (content: string) => string) {
    const keys = Object.keys(data);
    for (const k of keys) {
      if (skipProps.indexOf(k) !== -1) {
        continue;
      }

      const value = data[k];
      if (value && typeof value === "object") {
        this.process(value, processor);
      } else {
        data[k] = processor(value);
      }
    }
  }

  rememberEncryptionKey(profile: ProfileFormGroup, createdProfileId: number) {
    localStorage.setItem(encryptionStoreKeyFactory(createdProfileId), atob(profile.encryptionKeyCtrl.value));
  }

  getEncryptionKey(createdProfileId: number) {
    const k = localStorage.getItem(encryptionStoreKeyFactory(createdProfileId));
    if (!k) {
      return null;
    }

    return btoa(k);
  }

  forgetEncryptionKey(createdProfileId: number) {
    localStorage.removeItem(encryptionStoreKeyFactory(createdProfileId));
  }

  isRemembered(id: number): boolean {
    return !!localStorage.getItem(encryptionStoreKeyFactory(id));
  }
}
