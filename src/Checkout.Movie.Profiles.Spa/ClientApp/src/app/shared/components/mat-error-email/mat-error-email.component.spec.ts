import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatErrorEmailComponent } from "./mat-error-email.component";

describe("MatErrorEmailComponent", () => {
  let component: MatErrorEmailComponent;
  let fixture: ComponentFixture<MatErrorEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatErrorEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatErrorEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
