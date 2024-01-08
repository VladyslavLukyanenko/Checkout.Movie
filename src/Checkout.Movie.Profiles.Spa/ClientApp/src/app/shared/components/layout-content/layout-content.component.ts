import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "pst-layout-content",
  templateUrl: "./layout-content.component.html",
  styleUrls: ["./layout-content.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
