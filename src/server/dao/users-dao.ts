import { CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
import * as _ from 'lodash';
import {UserAddress} from '../../public/app/account/model/user-address';
import {Dependent} from '../../public/app/account/model/dependent';

export interface UsersDao {
  getAddressesForUser(id: string): [UserAddress];
  getDependentsForUser(id: string): [Dependent];
  createDependent(userId: string, dependent: Dependent);
  updateDependent(userId: string, dependent: Dependent);
  deleteAddressForUser(userId: string);
}
export interface UsersDao {
  getAddressesForUser(id: string): []
  email: string;
  privacyAgreement: string;
}
class UsersDaoDdb implements UsersDao {

}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.labels);
}

const myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);
