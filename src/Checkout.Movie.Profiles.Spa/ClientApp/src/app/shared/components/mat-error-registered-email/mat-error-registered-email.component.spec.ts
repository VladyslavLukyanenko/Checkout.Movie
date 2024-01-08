import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatErrorRegisteredEmailComponent } from "./mat-error-registered-email.component";

describe("MatErrorRegisteredEmailComponent", () => {
  let component: MatErrorRegisteredEmailComponent;
  let fixture: ComponentFixture<MatErrorRegisteredEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatErrorRegisteredEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatErrorRegisteredEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
