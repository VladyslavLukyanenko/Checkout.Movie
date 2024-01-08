import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ControlContainer} from "@angular/forms";
import {AddressFormGroup} from "../../models/address.form-group";
import {CountriesDomainProvider} from "../../../core/services/countries-domain.provider";
import {Country} from "../../../profiles-api";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {DisposableComponentBase} from "../../../shared/components/disposable.component-base";
import {map} from "rxjs/operators";

const defaultProvincesLabel = "Provinces";
const defaultPostalCodeLabel = "Postal Code";

@Component({
  selector: "pst-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent extends DisposableComponentBase implements OnInit {
  private _country$ = new BehaviorSubject<Country>(null);

  constructor(private controlContainer: ControlContainer,
              private countriesProvider: CountriesDomainProvider) {
    super();
  }

  isProvinceLabelVisible$: Observable<boolean>;
  isProvinceListVisible$: Observable<boolean>;
  isProvinceInputVisible$: Observable<boolean>;
  provincesLabel$: Observable<string>;
  postalCodeLabel$: Observable<string>;
  selectedCountry$: Observable<Country>;
  countries$: Observable<Country[]>;

  get addressForm(): AddressFormGroup {
    return this.controlContainer.control as AddressFormGroup;
  }

  ngOnInit(): void {
    this.countries$ = this.countriesProvider.countries$;
    this.selectedCountry$ = this._country$.asObservable();
    this.isProvinceInputVisible$ = this.selectedCountry$
      .pipe(map(c => c && c.isProvincesText));

    this.isProvinceListVisible$ = this.selectedCountry$
      .pipe(map(c => c && c.isProvincesList));

    this.isProvinceLabelVisible$ = combineLatest([this.isProvinceListVisible$, this.isProvinceInputVisible$])
      .pipe(map(([isList, isInput]) => isList || isInput));

    this.provincesLabel$ = this.selectedCountry$
      .pipe(map(c => c && c.provincesLabel || defaultProvincesLabel));

    this.postalCodeLabel$ = this.selectedCountry$
      .pipe(map(c => c && c.postalCodeLabel || defaultPostalCodeLabel));

    this.addressForm.countryIdCtrl
      .valueChanges
      .pipe(this.untilDestroy())
      .subscribe(v => this.handleCountryChanged(v));
  }

  handleCountryChanged(countryId: string) {
    const selected = this.countriesProvider.countriesSnapshot.find(_ => _.id === countryId) || {};
    this._country$.next(selected);
    this.addressForm.provinceCodeCtrl.setValue(null);
    this.addressForm.updatePostalCodeProvinceRequirements(selected.isPostalCodeRequired, selected.isProvincesRequired);
  }
}
