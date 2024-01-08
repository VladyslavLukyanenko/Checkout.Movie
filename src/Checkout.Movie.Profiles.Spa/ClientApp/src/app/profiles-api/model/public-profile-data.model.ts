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
import { Address } from "./address.model";
import { CreditCard } from "./credit-card.model";


export interface PublicProfileData {
    id?: number;
    userId?: number;
    name?: string | null;
    tags?: Array<string> | null;
    creditCard?: CreditCard;
    shippingAddress?: Address;
    billingAddress?: Address;
    areAddressesSame?: boolean;
}
