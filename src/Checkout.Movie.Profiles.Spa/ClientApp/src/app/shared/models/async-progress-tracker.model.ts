import {BehaviorSubject, Observable, OperatorFunction} from "rxjs";
import {finalize, tap} from "rxjs/operators";

export class AsyncProgressTracker {
  protected isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoading$: Observable<boolean> = this.isLoading.asObservable();

  loadingSignal<T>(): OperatorFunction<T, T> {
    return (source: Observable<T>) => {
      return source.pipe(
        tap(() => this.isLoading.next(true)),
        finalize(() => this.isLoading.next(false))
      );
    };
  }

  async executeAsync<T>(callable: Promise<T>): Promise<T> {
    try {
      this.isLoading.next(true);
      return await callable;
    } finally {
      this.isLoading.next(false);
    }
  }

  async executeAsAsync<T>(callable: Observable<T>): Promise<T> {
    return this.executeAsync(callable.toPromise());
  }

  toggleLoading(isLoading: boolean): void {
    this.isLoading.next(isLoading);
  }

  dispose() {
    this.isLoading.complete();
  }
}
