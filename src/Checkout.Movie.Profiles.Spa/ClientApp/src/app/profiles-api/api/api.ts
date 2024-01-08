export * from "./countries.service";
import { CountriesService } from "./countries.service";
export * from "./profiles.service";
import { ProfilesService } from "./profiles.service";
export * from "./registration.service";
import { RegistrationService } from "./registration.service";
export * from "./sharing-token.service";
import { SharingTokenService } from "./sharing-token.service";
export const APIS = [CountriesService, ProfilesService, RegistrationService, SharingTokenService];
