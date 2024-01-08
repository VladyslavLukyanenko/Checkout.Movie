import { Injectable } from "@angular/core";
import ClipboardPolyfill from "clipboard-polyfill";

@Injectable({
  providedIn: "root"
})
export class ClipboardService {

  constructor() {
  }

  writeText(text: string): void {
    ClipboardPolyfill.writeText(text);
  }
}
