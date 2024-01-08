import {Component, OnInit} from "@angular/core";
import {ToolbarService} from "../../services/toolbar.service";

// todo: refactor layout to separate toolbar
@Component({
  selector: "pst-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit {

  title: string;

  constructor(toolbarService: ToolbarService) {
    toolbarService.titleToken$.subscribe(title => {
      this.title = title;
    });
  }

  ngOnInit() {
  }

}
