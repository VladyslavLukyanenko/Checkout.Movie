import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from "@angular/core";
import {Router} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {AnimationBuilder} from "@angular/animations";

@Component({
  selector: "pst-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  label: string;

  @Input()
  link: string[];

  @Input()
  state: string;

  @Input()
  badgeValue: any;

  @Output()
  itemClicked: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(MenuComponent) menus: QueryList<MenuComponent>;

  constructor(private _builder: AnimationBuilder,
              private router: Router) {
  }

  ngOnInit() {
  }

  navigate(e: Event) {
    e.preventDefault();
    this.dispatchClick();
    if (!this.link || !this.link.length) {
      return;
    }

    this.router.navigate(this.link);
  }

  private dispatchClick() {
    this.itemClicked.emit();
  }
}
