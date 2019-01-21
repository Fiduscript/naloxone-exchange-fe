import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { B2bService } from '../b2b.service';

@Component({
  selector: 'app-purchase-order-form-confirm',
  templateUrl: './purchase-order-form-confirm.component.pug',
  styleUrls: ['./purchase-order-form-confirm.component.styl']
})
export class PurchaseOrderFormConfirmComponent implements OnInit {

  private static readonly contactEmail = 'sales@fiduscript.com';

  public orderId: string;
  public orderExists: boolean;
  public error: string;

  public constructor(
    private b2bService: B2bService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.orderId = params['orderId'];
    });
    this.setOrderExists(this.orderId);
  }

  private setOrderExists(id): void {
    this.b2bService.businessPurchaseOrderExists(id).subscribe(
      (exists: boolean): void => {
        this.orderExists = exists;
      },
      (error: Error): void => {
        console.log(error.message);
        this.error = error.message;
      }
    );
  }

  public getContactEmail() {
    return PurchaseOrderFormConfirmComponent.contactEmail;
  }

}
