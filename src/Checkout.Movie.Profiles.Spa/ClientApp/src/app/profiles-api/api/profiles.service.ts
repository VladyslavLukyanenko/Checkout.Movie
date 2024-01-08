/**
 * Profiles API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from "@angular/common/http";
import { CustomHttpParameterCodec }                          from "../encoder";
import { Observable }                                        from "rxjs";

import { ProblemDetails } from "../model/models";
import { ProfileDataApiContract } from "../model/models";
import { ProfileDataIListApiContract } from "../model/models";
import { PublicProfileData } from "../model/models";
import { PublicProfileDataApiContract } from "../model/models";

import { BASE_PATH, COLLECTION_FORMATS }                     from "../variables";
import { Configuration }                                     from "../configuration";



@Injectable({
  providedIn: "root"
})
export class ProfilesService {

    protected basePath = "http://localhost";
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== "string") {
            if (typeof basePath !== "string") {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object") {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param publicProfileData
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public profilesCreate(publicProfileData?: PublicProfileData, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public profilesCreate(publicProfileData?: PublicProfileData, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public profilesCreate(publicProfileData?: PublicProfileData, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public profilesCreate(publicProfileData?: PublicProfileData, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                "text/plain",
                "application/json",
                "text/json"
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            "application/json-patch+json",
            "application/json",
            "text/json",
            "application/_*+json"
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        let responseType: "text" | "json" = "json";
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith("text")) {
            responseType = "text";
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/v1/profiles`,
            publicProfileData,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param profileId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public profilesDelete(profileId: number, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public profilesDelete(profileId: number, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public profilesDelete(profileId: number, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public profilesDelete(profileId: number, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (profileId === null || profileId === undefined) {
            throw new Error("Required parameter profileId was null or undefined when calling profilesDelete.");
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                "text/plain",
                "application/json",
                "text/json"
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }


        let responseType: "text" | "json" = "json";
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith("text")) {
            responseType = "text";
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/v1/profiles/${encodeURIComponent(String(profileId))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param profileId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public profilesGetById(profileId: number, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<ProfileDataApiContract>;
    public profilesGetById(profileId: number, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<ProfileDataApiContract>>;
    public profilesGetById(profileId: number, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<ProfileDataApiContract>>;
    public profilesGetById(profileId: number, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (profileId === null || profileId === undefined) {
            throw new Error("Required parameter profileId was null or undefined when calling profilesGetById.");
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                "text/plain",
                "application/json",
                "text/json"
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }


        let responseType: "text" | "json" = "json";
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith("text")) {
            responseType = "text";
        }

        return this.httpClient.get<ProfileDataApiContract>(`${this.configuration.basePath}/v1/profiles/${encodeURIComponent(String(profileId))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public profilesGetList(observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<ProfileDataIListApiContract>;
    public profilesGetList(observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<ProfileDataIListApiContract>>;
    public profilesGetList(observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<ProfileDataIListApiContract>>;
    public profilesGetList(observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                "text/plain",
                "application/json",
                "text/json"
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }


        let responseType: "text" | "json" = "json";
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith("text")) {
            responseType = "text";
        }

        return this.httpClient.get<ProfileDataIListApiContract>(`${this.configuration.basePath}/v1/profiles`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param token
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public profilesGetShared(token: string, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<PublicProfileDataApiContract>;
    public profilesGetShared(token: string, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<PublicProfileDataApiContract>>;
    public profilesGetShared(token: string, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<PublicProfileDataApiContract>>;
    public profilesGetShared(token: string, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (token === null || token === undefined) {
            throw new Error("Required parameter token was null or undefined when calling profilesGetShared.");
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                "text/plain",
                "application/json",
                "text/json"
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }


        let responseType: "text" | "json" = "json";
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith("text")) {
            responseType = "text";
        }

        return this.httpClient.get<PublicProfileDataApiContract>(`${this.configuration.basePath}/v1/profiles/${encodeURIComponent(String(token))}`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param profileId
     * @param publicProfileData
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public profilesUpdate(profileId: number, publicProfileData?: PublicProfileData, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public profilesUpdate(profileId: number, publicProfileData?: PublicProfileData, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public profilesUpdate(profileId: number, publicProfileData?: PublicProfileData, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public profilesUpdate(profileId: number, publicProfileData?: PublicProfileData, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (profileId === null || profileId === undefined) {
            throw new Error("Required parameter profileId was null or undefined when calling profilesUpdate.");
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set("Authorization", this.configuration.apiKeys["Authorization"]);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                "text/plain",
                "application/json",
                "text/json"
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            "application/json-patch+json",
            "application/json",
            "text/json",
            "application/_*+json"
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        let responseType: "text" | "json" = "json";
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith("text")) {
            responseType = "text";
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/v1/profiles/${encodeURIComponent(String(profileId))}`,
            publicProfileData,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
