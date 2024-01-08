import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreditCard} from "../../profiles-api";
import {CreditCardValidator} from "../../core/services/validation/credit-card.validator";
import {BehaviorSubject, Observable} from "rxjs";
import * as cardValidator from "card-validator";


export class CreditCardFormGroup extends FormGroup {
  private _cardType$: BehaviorSubject<string>;

  cardType$: Observable<string>;
  constructor(data?: CreditCard) {
    data = data || {};
    super({
      cardNumber: new FormControl(data.cardNumber, [Validators.required, CreditCardValidator.number]),
      cvv: new FormControl(data.cvv, [Validators.required, CreditCardValidator.cvv]),
      expiry: new FormControl(data.expiry, [Validators.required, CreditCardValidator.expirationDate]),
    });

    this._cardType$ = new BehaviorSubject<string>(null);
    this.cardNumberCtrl.valueChanges.subscribe(cardNumber => {
      const typeInfo = cardValidator.number(cardNumber);
      const cardType = typeInfo.card && typeInfo.card.niceType || "Unknown card type";
      this._cardType$.next(cardType);
      console.log(typeInfo);
    });

    this.cardType$ = this._cardType$.asObservable();

    if (data.cardNumber) {
      this.cardNumberCtrl.updateValueAndValidity();
    }
  }

  get cardNumberCtrl(): FormControl {
    return this.get("cardNumber") as FormControl;
  }

  get cvvCtrl(): FormControl {
    return this.get("cvv") as FormControl;
  }

  get expiryCtrl(): FormControl {
    return this.get("expiry") as FormControl;
  }

}
