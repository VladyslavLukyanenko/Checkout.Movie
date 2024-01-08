import {Component, OnInit, ChangeDetectionStrategy, Inject} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "pst-lightbox-carousel",
  templateUrl: "./lightbox-carousel.component.html",
  styleUrls: ["./lightbox-carousel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxCarouselComponent implements OnInit {

  activeItem: LightboxItem;
  activeIdx: number = -1;

  constructor(private sanitizer: DomSanitizer,
              @Inject(MAT_DIALOG_DATA) readonly data: LightboxItem[],
              private dialogRef: MatDialogRef<LightboxCarouselComponent>) {
  }

  get hasPrev(): boolean {
    return this.activeIdx > 0;
  }

  get hasNext(): boolean {
    return this.activeIdx < this.data.length - 1;
  }

  ngOnInit() {
    for (const d of this.data) {
      switch (d.type) {
        case "image":
          d._renderedSource = this.sanitizer.bypassSecurityTrustStyle(`url(${d.source})`);
          break;
      }
    }
    this.activeIdx = 0;
    this.activeItem = this.data[this.activeIdx];
  }

  activate(item: LightboxItem) {
    this.activeIdx = this.data.indexOf(item);
    this.activeItem = this.data[this.activeIdx];
  }

  activateNext() {
    if (!this.hasNext) {
      return;
    }

    this.activeItem = this.data[++this.activeIdx];
  }

  activatePrev() {
    if (!this.hasPrev) {
      return;
    }

    this.activeItem = this.data[--this.activeIdx];
  }
}

export interface LightboxItem {
  source: string;
  type: "video" | "image";
  _renderedSource?: SafeHtml;
}
