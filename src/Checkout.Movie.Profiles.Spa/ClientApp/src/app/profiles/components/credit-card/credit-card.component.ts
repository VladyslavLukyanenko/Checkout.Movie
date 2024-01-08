import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ControlContainer} from "@angular/forms";
import {CreditCardFormGroup} from "../../models/credit-card.form-group";

@Component({
  selector: "pst-credit-card",
  templateUrl: "./credit-card.component.html",
  styleUrls: ["./credit-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) { }

  get creditCardForm(): CreditCardFormGroup {
    return this.controlContainer.control as CreditCardFormGroup;
  }

  ngOnInit(): void {
  }

}
