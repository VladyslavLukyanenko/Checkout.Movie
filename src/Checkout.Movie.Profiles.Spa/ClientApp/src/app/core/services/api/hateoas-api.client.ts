// import {Injectable} from "@angular/core";
// import {HateoasRequest} from "./hateoas-request.model";
// import {BehaviorSubject, EMPTY, Observable, Subject, throwError, timer} from "rxjs";
// import {catchError, filter, finalize, map, mergeMap, retryWhen} from "rxjs/operators";
// import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
// import {IApiContract} from "./api-contract.model";
// import {HateoasLink, PagedList} from "./core-types";
// import {IApiError} from "./api-error.model";
// import {HateoasRequestBuilder, HateoasRequestBuilderImpl} from "./hateoas-request.builder";
// import {TokenService} from "../token.service";
// import {RequestRefreshRequest} from "../request-refresh-request.model";
// import {ApplicationSecurityToken} from "../application-security-token.model";
// import {AppSettingsService} from "../app-settings.service";
// import {ApiRootLinks} from "../api-root-links.model";
// import {ActivatedRoute, Router} from "@angular/router";
// import {HateoasRequestConverter} from "./hateoas-request.converter";
// import {GenericErrorNotifierService} from "../notifications/generic-error-notifier.service";
//
// const isPagedListResponse = (response: any) => typeof response === "object" && "content" in response && "pageIndex" in response;
// const retryStrategy = ({maxRetryAttempts = 5, scalingDuration = 1000, includedStatusCodes = [500, 502, 504]} = {}) =>
//   (attempts: Observable<any>) =>
//     attempts.pipe(
//       mergeMap((error, idx) => {
//           const currentAttempt = idx + 1;
//           if (currentAttempt > maxRetryAttempts) {
//             console.error("Maximum retry attempts reached or .");
//             return throwError(error);
//           } else if (includedStatusCodes.indexOf(error.status) === -1) {
//             console.info("Retry attempt skipped.");
//             return throwError(error);
//           }
//
//           const delay = currentAttempt * scalingDuration;
//           console.info(`Retry in ${delay}ms...`);
//           return timer(delay);
//         }
//       )
//     );
//
// @Injectable({
//   providedIn: "root"
// })
// export class HateoasApiClient {
//   private readonly activeRequests: HateoasRequest[];
//   private readonly activeRequestsSubj: BehaviorSubject<HateoasRequest[]>;
//   private apiRootLinks: ApiRootLinks;
//
//   private pendingReauthentication: boolean = false;
//   private pendingRequests: Subject<any>[] = [];
//
//
//   hasActiveRequests$: Observable<boolean>;
//
//   constructor(
//     private errorNotifierService: GenericErrorNotifierService,
//     protected readonly httpClient: HttpClient,
//     private tokenService: TokenService,
//     private converter: HateoasRequestConverter,
//     // private renewalScheduler: AuthenticationSchedulerService,
//     private readonly settings: AppSettingsService,
//     private readonly _router: Router,
//     private readonly _activatedRoute: ActivatedRoute
//   ) {
//     this.activeRequests = [];
//     this.activeRequestsSubj = new BehaviorSubject([]);
//     this.settings.apiRootLinks$
//       .subscribe(rootLinks => this.apiRootLinks = rootLinks);
//     this.hasActiveRequests$ = this.activeRequests$.pipe(map(r => !!r.length));
//   }
//
//   builder(link: HateoasLink): HateoasRequestBuilder {
//     return new HateoasRequestBuilderImpl(link, this);
//   }
//
//   get activeRequests$() {
//     return this.activeRequestsSubj.asObservable();
//   }
//
//   execute<R>(request: HateoasRequest | HateoasLink): Observable<R> {
//     return this.executeRaw<IApiContract<R> | IApiContract<R[]> | IApiContract<PagedList<R>>>(request)
//       .pipe(map(response => {
//         if (!response) { // suppose this is 204
//           return null;
//         }
//
//         if (isPagedListResponse(response.payload)) {
//           throw new Error("Received response of type PagedList but call expects list or single results");
//         }
//
//         // if (r.status === 204 /*No content*/ || !r.body) {
//         //   return null;
//         // }
//         //
//         // return mapper
//         //   ? mapper(r)
//         //   : <any>r.body.payload;
//         return <R>response.payload;
//       }));
//   }
//
//   requestPagedData<R>(request: HateoasRequest | HateoasLink): Observable<PagedList<R>> {
//     return this.executeRaw<IApiContract<R> | IApiContract<R[]> | IApiContract<PagedList<R>>>(request)
//       .pipe(map(response => {
//         if (!isPagedListResponse(response.payload)) {
//           throw new Error("Call expects PagedList but received list or single result");
//         }
//
//         // if (r.status === 204 /*No content*/ || !r.body) {
//         //   return null;
//         // }
//         //
//         // return mapper
//         //   ? mapper(r)
//         //   : <any>r.body.payload;
//         return <PagedList<R>>response.payload;
//       }));
//   }
//
//   sendJson<R>(
//     request: HateoasRequest | HateoasLink, body: any = null): Observable<R> {
//     return this.executeWithHeaders<R>(request, body, {
//       "content-type": "application/json"
//     });
//   }
//
//   sendMultipartFormData<R>(request: HateoasRequest | HateoasLink, body: any = null): Observable<R> {
//     return this.executeWithHeaders(request, body, {
//       "content-type": "multipart/form-data"
//     });
//   }
//
//   executeRaw<R>(request: HateoasRequest | HateoasLink, responseType: "arraybuffer" | "blob" | "json" | "text" = "json")
//     : Observable<any> {
//     request = this.converter.ensureHateoasRequest(request);
//
//     request.setHeader("Accept-Language", AppSettingsService.defaultCultureCode);
//
//     const init = this.converter.buildRawParams(request, responseType);
//     this.activeRequests.push(request);
//     this.notifyAboutActiveRequestsChange();
//
//     return new Observable<HttpResponse<any>>(observer => {
//       this.httpClient.request<any>(init)
//         .pipe(
//           filter(r => r.type === HttpEventType.Response),
//           map((r: HttpResponse<any>) => r.body),
//           finalize(() => {
//             const index = this.activeRequests.indexOf(<HateoasRequest>request);
//             if (index === -1) {
//               throw new Error("Can't find finished request in queue of active requests");
//             }
//
//             this.activeRequests.splice(index, 1);
//             this.notifyAboutActiveRequestsChange();
//           }),
//           retryWhen(retryStrategy()),
//           catchError(e => this.handleError(e, init))
//         )
//         .subscribe(r => {
//             observer.next(r);
//             observer.complete();
//           },
//           e => {
//             observer.error(e);
//             observer.complete();
//           });
//     });
//   }
//
//   reauthenticate(): Observable<any> {
//     const newPendingRequest = new Subject<void>();
//     this.pendingRequests.push(newPendingRequest);
//     console.warn("pendingRequests", this.pendingRequests.length);
//     if (!this.pendingReauthentication) {
//       console.warn("reauthenticate " + (new Date));
//       this.pendingReauthentication = true;
//
//       const authParams: RequestRefreshRequest = {
//         refreshToken: this.tokenService.encodedRefreshToken
//       };
//
//       const request = new HateoasRequest(this.apiRootLinks.requestRefresh)
//         .setBody(authParams);
//
//       request.setHeader("Accept-Language", AppSettingsService.defaultCultureCode);
//
//       const init = this.converter.buildRawParams(request);
//
//       this.httpClient.request(init)
//         .pipe(
//           filter(r => r.type === HttpEventType.Response),
//           map((r: HttpResponse<IApiContract<ApplicationSecurityToken>>) => r.body.payload),
//           map((token: ApplicationSecurityToken) => {
//             this.tokenService.setSecurityToken(token);
//             return token;
//           }),
//           retryWhen(retryStrategy()),
//           catchError(error => {
//             // this.logOut();
//             // this._router.navigate([this.settings.currentCultureId, "account"], {
//             //   queryParams: {returnUrl: this._router.routerState.snapshot.url},
//             //   relativeTo: this._activatedRoute.root
//             // });
//
//             return throwError(error);
//           }),
//           finalize(() => {
//             this.pendingReauthentication = false;
//           })
//         )
//         .subscribe(() => {
//           console.warn("reauthenticate refreshed " + (new Date));
//           this.popPendingRequestAndExecute(pr => pr.next());
//           console.warn("reauthenticate resumed pending requests " + (new Date));
//         }, (e) => {
//           console.warn("reauthenticate error " + (new Date));
//           this.popPendingRequestAndExecute(pr => pr.error(e));
//         });
//     }
//
//     return newPendingRequest;
//   }
//
//   private popPendingRequestAndExecute(executor: (r: Subject<void>) => void) {
//     while (this.pendingRequests.length) {
//       const pr = this.pendingRequests[0];
//       executor(pr);
//       pr.complete();
//       this.pendingRequests.splice(0, 1);
//     }
//
//     console.warn("popPendingRequestAndExecute", this.pendingRequests.length);
//   }
//
//   private notifyAboutActiveRequestsChange() {
//     this.activeRequestsSubj.next(this.activeRequests.slice());
//   }
//
//   private handleError<T>(error: HttpErrorResponse, httpRequest: HttpRequest<any>) {
//     if (error.status === 401) {
//       return this.reauthenticate()
//         .pipe(
//           mergeMap(() => this.httpClient.request(httpRequest)),
//           filter(r => r.type === HttpEventType.Response),
//           map((r: HttpResponse<T>) => r.body)
//         )
//         .toPromise();
//     }
//
//     let apiError: IApiError;
//     const fallbackErrorCode = "UnhandledError";
//
//     if (error.error instanceof ErrorEvent) {
//       // A client-side or network error occurred. Handle it accordingly.
//       console.error("An error occurred:", error.error.message);
//     } else if (error.error && error.error.error && error.error.error.code) {
//       apiError = <IApiError>error.error.error;
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       console.error(
//         `Server returned code ${apiError.code}, ` +
//         (apiError.message ? `body was: ${apiError.message}` : "")
//       );
//     } else {
//       if (error && error.status === 400 && error.error) {
//         if (error.error.payload) {
//           apiError = {
//             code: error.error.payload.code || fallbackErrorCode
//           };
//         } else if (error.error.code) {
//           apiError = {
//             code: error.error.code
//           };
//
//           if (error.error.errors && error.error.errors.length) {
//             apiError.code += ":" + error.error.errors[0];
//           }
//         }
//       }
//
//       if (!apiError) {
//         apiError = {
//           code: fallbackErrorCode
//         };
//       }
//
//       console.error(`Unhandled error occurred ${error.status}`);
//     }
//
//     if (!apiError.code) {
//       apiError.code = fallbackErrorCode;
//     }
//
//     if (error.status === 403) {
//       apiError.code = "Forbidden";
//       this.errorNotifierService.showWarning(apiError);
//       return EMPTY;
//     }
//
//     // return an observable with a user-facing error message
//     return throwError(apiError);
//   }
//
//   private executeWithHeaders<R>(
//     request: HateoasRequest | HateoasLink, body: any = null, headers: any = {}): Observable<R> {
//     request = this.converter.ensureHateoasRequest(request);
//
//     if (headers) {
//       for (const key in headers) {
//         if (headers.hasOwnProperty(key)) {
//           request.setHeader(key, headers[key]);
//         }
//       }
//     }
//
//     if (body) {
//       request.setBody(body);
//     }
//
//     return this.execute<R>(request);
//   }
// }
