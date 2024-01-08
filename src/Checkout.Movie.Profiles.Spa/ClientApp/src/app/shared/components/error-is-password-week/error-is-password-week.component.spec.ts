import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ErrorIsPasswordWeekComponent } from "./error-is-password-week.component";

describe("ErrorIsPasswordWeekComponent", () => {
  let component: ErrorIsPasswordWeekComponent;
  let fixture: ComponentFixture<ErrorIsPasswordWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorIsPasswordWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorIsPasswordWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
