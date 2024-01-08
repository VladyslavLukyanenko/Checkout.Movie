import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {ProfileFormGroup} from "../../models/profile.form-group";

@Component({
  selector: "pst-shared-profile",
  templateUrl: "./shared-profile.component.html",
  styleUrls: ["./shared-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedProfileComponent implements OnInit {
  @Input()
  profile: ProfileFormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
