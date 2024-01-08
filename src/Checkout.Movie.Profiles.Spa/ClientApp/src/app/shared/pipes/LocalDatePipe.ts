import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment";
import {Moment} from "moment";
import {Observable, of} from "rxjs";

@Pipe({name: "localDate"})
export class LocalDatePipe implements PipeTransform {
  transform(date: Moment|Date|string, format?: string): Observable<string> {
    if (!format) {
      format = "LL";
    }
    return of(moment(date).format(format));
  }
}
