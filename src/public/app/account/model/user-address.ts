import {IState} from '../../../../common/constant/states';

export interface UserAddress {
  name: string; // is this appropriate here? may want to support multiple shipping addresses
  street: string;
  city: string;
  state: IState;
  zip: string;
}
