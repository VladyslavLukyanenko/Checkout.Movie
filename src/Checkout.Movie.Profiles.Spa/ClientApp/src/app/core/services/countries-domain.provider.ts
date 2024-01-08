import {Injectable} from "@angular/core";
import {CountriesService, Country} from "../../profiles-api";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CountriesDomainProvider {
  private _countries$ = new BehaviorSubject<Country[]>([]);
  constructor(private countriesService: CountriesService) {
    this.countries$ = this._countries$.asObservable();
  }

  get countriesSnapshot(): Country[] {
    return this._countries$.getValue().slice();
  }

  countries$: Observable<Country[]>;

  async refresh(): Promise<void> {
    this._countries$.next(await this.countriesService.countriesGetList().toPromise());
  }
}
