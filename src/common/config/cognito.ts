import { AccountType } from '../account-types';

export interface CognitoConfig {
    appClientId: string;
    region: string;
    userPoolId: string;
}

const COGNITO_CONFIG_PER_ACCOUNT_TYPE: Map<AccountType, CognitoConfig> = new Map([
    [AccountType.Consumer, { appClientId: '7dum3ivsqng75jdve4sc39tve4', region: 'us-east-2', userPoolId: 'us-east-2_ej6SB5BPr' }],
    [AccountType.Business, { appClientId: '2almd6su98hvm10i04o34co9at', region: 'us-east-2', userPoolId: 'us-east-2_My4WRmfXa' }]
]);

export class CognitoConfig {

    public static getConfig(accountType: AccountType): CognitoConfig {
        if (COGNITO_CONFIG_PER_ACCOUNT_TYPE.has(accountType)) {
            return COGNITO_CONFIG_PER_ACCOUNT_TYPE.get(accountType);
        } else {
            throw new Error(`Login to ${AccountType[accountType]} accounts currently unsupported.`);
        }
    }

}
