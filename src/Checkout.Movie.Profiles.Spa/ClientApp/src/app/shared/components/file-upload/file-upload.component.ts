import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {AbstractControl, ControlValueAccessor, FormControl} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Base64FileResource} from "../../models/base64-file.resource";
import {NotificationService} from "../../../core/services/notifications/notification.service";
import {TranslateService} from "@ngx-translate/core";

type ValueChangesObserverFn = (newValue?: any) => void;

@Component({
  selector: "pst-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements ControlValueAccessor, OnChanges {
  control: AbstractControl = new FormControl();
  @Input()
  supportedFileTypes = "";

  @Input()
  fileUrl: string;

  @Output()
  fileSelect: EventEmitter<Base64FileResource> = new EventEmitter<Base64FileResource>();

  private lastTouched: boolean;
  private valueChangeObserver: ValueChangesObserverFn;
  displayFileName: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService) {
  }


  registerOnChange(fn: ValueChangesObserverFn): void {
    this.valueChangeObserver = fn;
  }

  registerOnTouched(fn: ValueChangesObserverFn): void {
    this.lastTouched = this.control.touched;
    this.control.statusChanges.subscribe(() => {
      if (this.lastTouched === this.control.touched) {
        return;
      }

      this.lastTouched = this.control.touched;
      fn(this.control.touched);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  writeValue(obj: any): void {
    // NOOP
  }

  handleFileSelected(changeEvent: Event) {
    const fInput: HTMLInputElement = <HTMLInputElement>changeEvent.target;
    if (!fInput.files.length) {
      return;
    }

    const file = fInput.files[0];
    if (file.size > environment.fileSizeLimitBytes) {
      const params = {
        size: environment.fileSizeLimitBytes / 1024 / 1024
      };

      this.translateService.get("globalErrors.UploadFileSizeLimitExceeded", params)
        .subscribe(message => {
          this.notificationService.error(message);
        });

      return;
    }

    if (this.valueChangeObserver) {
      this.valueChangeObserver(file);
    }

    this.dispatchFileSelected(file);
  }

  private dispatchFileSelected(file: File) {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.fileSelect.emit({
        name: file.name,
        content: reader.result as string,
        contentType: file.type,
        length: file.size
      });

      this.displayFileName = file.name;
      this.changeDetector.detectChanges();
    });

    reader.readAsDataURL(file);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fileUrl && changes.fileUrl.currentValue) {
      this.displayFileName = this.getDisplayFileName();
    }
  }

  private getDisplayFileName() {
    let startIdx;
    if (this.fileUrl && (startIdx = this.fileUrl.lastIndexOf("/")) !== -1) {
      return this.fileUrl.substring(startIdx + 1);
    }

    return this.fileUrl;
  }
}
