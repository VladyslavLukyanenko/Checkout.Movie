import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "pst-layout-header",
  templateUrl: "./layout-header.component.html",
  styleUrls: ["./layout-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
