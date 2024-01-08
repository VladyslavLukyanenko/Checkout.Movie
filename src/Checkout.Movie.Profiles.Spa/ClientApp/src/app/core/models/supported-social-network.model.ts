import {SocialNetworkTypes} from '../../account/services';


export interface SupportedSocialNetwork {
  type: SocialNetworkTypes;
  icon: string;
  title: string;
  id: string;
}
