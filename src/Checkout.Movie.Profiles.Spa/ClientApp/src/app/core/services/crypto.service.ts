import {Injectable} from "@angular/core";
import * as aesjs from "aes-js";

@Injectable({
  providedIn: "root"
})
export class CryptoService {
  encode(content: string, pwd: string): string {
    this.ensureValidKey(pwd);

    const key = pwd.trim();
    const value = content.trim();
    const keyBuffer = aesjs.utils.utf8.toBytes(key);
    const inputBuffer = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(value));

    const escEcb = new aesjs.ModeOfOperation.ecb(keyBuffer);
    const encryptedBytes = escEcb.encrypt(inputBuffer);

    return aesjs.utils.hex.fromBytes(encryptedBytes);
  }

  decode(content: string, pwd: string): string {
    this.ensureValidKey(pwd);
    const key = pwd.trim();
    const data = content.trim();

    const keyBuffer = aesjs.utils.utf8.toBytes(key);
    const escEcb = new aesjs.ModeOfOperation.ecb(keyBuffer);
    const buf = aesjs.utils.hex.toBytes(data);
    const decryptedBytes = aesjs.padding.pkcs7.strip(escEcb.decrypt(buf));
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  private ensureValidKey(pwd: string) {
    if (pwd.length !== 32) {
      throw new Error("Length of the key must be 32 symbols");
    }
  }
}
