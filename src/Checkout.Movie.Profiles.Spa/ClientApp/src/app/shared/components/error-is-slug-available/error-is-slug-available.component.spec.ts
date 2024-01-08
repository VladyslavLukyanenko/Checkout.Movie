import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ErrorIsSlugAvailableComponent } from "./error-is-slug-available.component";

describe("ErrorIsSlugAvailableComponent", () => {
  let component: ErrorIsSlugAvailableComponent;
  let fixture: ComponentFixture<ErrorIsSlugAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorIsSlugAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorIsSlugAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
