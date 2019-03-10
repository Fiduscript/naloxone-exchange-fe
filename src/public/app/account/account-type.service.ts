import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AccountType } from '../../../common/account-types';
import { FiduServiceBase } from '../common/fidu-service-base';

@Injectable({
    providedIn: 'root'
})
export class AccountTypeService extends FiduServiceBase {

    AccountType = AccountType;

    public constructor(private cookieService: CookieService) {
        super();
    }

    public accountTypeMatches(accountType: AccountType): boolean {
        return accountType === this.getAccountType();
    }

    public getAccountType(): AccountType {
        return Number(this.cookieService.get('AccountType'));
    }

    public getAccountTypeString(): string {
        return AccountType[this.getAccountType()].toString();
    }

}
