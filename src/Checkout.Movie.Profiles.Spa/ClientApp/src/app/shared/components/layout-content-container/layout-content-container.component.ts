import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "pst-layout-content-container",
  templateUrl: "./layout-content-container.component.html",
  styleUrls: ["./layout-content-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContentContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
