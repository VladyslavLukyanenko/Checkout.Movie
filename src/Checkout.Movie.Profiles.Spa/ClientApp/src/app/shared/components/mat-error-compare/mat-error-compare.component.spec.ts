import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatErrorCompareComponent } from "./mat-error-compare.component";

describe("MatErrorCompareComponent", () => {
  let component: MatErrorCompareComponent;
  let fixture: ComponentFixture<MatErrorCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatErrorCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatErrorCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
