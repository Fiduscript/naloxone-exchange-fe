import { CognitoUserSession } from 'amazon-cognito-identity-js';

export interface IUserSession {
  cognitoSession: CognitoUserSession;
}
