import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ErrorGtComponent } from "./error-gt.component";

describe("ErrorGtComponent", () => {
  let component: ErrorGtComponent;
  let fixture: ComponentFixture<ErrorGtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorGtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorGtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
