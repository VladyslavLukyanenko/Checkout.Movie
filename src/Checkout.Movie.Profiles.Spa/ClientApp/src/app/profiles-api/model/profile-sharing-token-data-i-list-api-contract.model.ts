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
import { ProfileSharingTokenData } from "./profile-sharing-token-data.model";
import { ApiError } from "./api-error.model";


export interface ProfileSharingTokenDataIListApiContract {
    error?: ApiError;
    readonly payload?: Array<ProfileSharingTokenData> | null;
}

