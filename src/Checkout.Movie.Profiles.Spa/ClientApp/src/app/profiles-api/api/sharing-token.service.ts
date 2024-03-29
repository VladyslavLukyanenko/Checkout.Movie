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
import { ProfileSharingTokenData } from "../model/models";
import { ProfileSharingTokenDataIListApiContract } from "../model/models";

import { BASE_PATH, COLLECTION_FORMATS }                     from "../variables";
import { Configuration }                                     from "../configuration";



@Injectable({
  providedIn: "root"
})
export class SharingTokenService {

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
     * @param profileSharingTokenData
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sharingTokenCreate(profileSharingTokenData?: ProfileSharingTokenData, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public sharingTokenCreate(profileSharingTokenData?: ProfileSharingTokenData, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public sharingTokenCreate(profileSharingTokenData?: ProfileSharingTokenData, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public sharingTokenCreate(profileSharingTokenData?: ProfileSharingTokenData, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {

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

        return this.httpClient.post<any>(`${this.configuration.basePath}/v1/sharingtoken`,
            profileSharingTokenData,
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
     * @param tokenId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sharingTokenDelete(tokenId: number, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public sharingTokenDelete(tokenId: number, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public sharingTokenDelete(tokenId: number, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public sharingTokenDelete(tokenId: number, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (tokenId === null || tokenId === undefined) {
            throw new Error("Required parameter tokenId was null or undefined when calling sharingTokenDelete.");
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

        return this.httpClient.delete<any>(`${this.configuration.basePath}/v1/sharingtoken/${encodeURIComponent(String(tokenId))}`,
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
    public sharingTokenGetSharingTokens(profileId: number, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<ProfileSharingTokenDataIListApiContract>;
    public sharingTokenGetSharingTokens(profileId: number, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<ProfileSharingTokenDataIListApiContract>>;
    public sharingTokenGetSharingTokens(profileId: number, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<ProfileSharingTokenDataIListApiContract>>;
    public sharingTokenGetSharingTokens(profileId: number, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (profileId === null || profileId === undefined) {
            throw new Error("Required parameter profileId was null or undefined when calling sharingTokenGetSharingTokens.");
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

        return this.httpClient.get<ProfileSharingTokenDataIListApiContract>(`${this.configuration.basePath}/v1/sharingtoken/${encodeURIComponent(String(profileId))}`,
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
     * @param tokenId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sharingTokenGrant(tokenId: number, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public sharingTokenGrant(tokenId: number, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public sharingTokenGrant(tokenId: number, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public sharingTokenGrant(tokenId: number, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (tokenId === null || tokenId === undefined) {
            throw new Error("Required parameter tokenId was null or undefined when calling sharingTokenGrant.");
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

        return this.httpClient.put<any>(`${this.configuration.basePath}/v1/sharingtoken/${encodeURIComponent(String(tokenId))}/grant`,
            null,
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
    public sharingTokenRequestAuthorization(token: string, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public sharingTokenRequestAuthorization(token: string, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public sharingTokenRequestAuthorization(token: string, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public sharingTokenRequestAuthorization(token: string, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (token === null || token === undefined) {
            throw new Error("Required parameter token was null or undefined when calling sharingTokenRequestAuthorization.");
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

        return this.httpClient.put<any>(`${this.configuration.basePath}/v1/sharingtoken/${encodeURIComponent(String(token))}/authorize`,
            null,
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
     * @param tokenId
     * @param profileSharingTokenData
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sharingTokenUpdate(tokenId: number, profileSharingTokenData?: ProfileSharingTokenData, observe?: "body", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any>;
    public sharingTokenUpdate(tokenId: number, profileSharingTokenData?: ProfileSharingTokenData, observe?: "response", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpResponse<any>>;
    public sharingTokenUpdate(tokenId: number, profileSharingTokenData?: ProfileSharingTokenData, observe?: "events", reportProgress?: boolean, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<HttpEvent<any>>;
    public sharingTokenUpdate(tokenId: number, profileSharingTokenData?: ProfileSharingTokenData, observe: any = "body", reportProgress: boolean = false, options?: {httpHeaderAccept?: "text/plain" | "application/json" | "text/json"}): Observable<any> {
        if (tokenId === null || tokenId === undefined) {
            throw new Error("Required parameter tokenId was null or undefined when calling sharingTokenUpdate.");
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

        return this.httpClient.put<any>(`${this.configuration.basePath}/v1/sharingtoken/${encodeURIComponent(String(tokenId))}`,
            profileSharingTokenData,
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
