export interface IAddress {
  addressId: string; // you don't have this. I think you need it right?
  city: string;
  name: string;
  phoneNumber?: string;  // need
  specialInstructions?: string; // need
  state: string; // state province region
  street1: string;
  street2: string;
  userId: string;
  weekendOkay: boolean; // need
  zip: string;
}
