import * as _ from 'lodash';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidatorsDirective } from '../../../common/form/customer-validators/custom-validators.directive';
import { BuyService } from '../../buy.service';
import { IBusinessPurchaseOrder } from '../../model/businessPurchaseOrder';
import { Products } from '../../model/products';
import { B2bService } from '../b2b.service';

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.component.pug',
  styleUrls: ['./purchase-order-form.component.styl']
})
export class PurchaseOrderFormComponent implements OnInit {
  private static readonly ATTRIBUTION_SOURCES: string[] = [
    'Facebook Advertisement',
    'Twitter Advertisement',
    'Google Advertisement',
    'Word of Mouth',
    'Other',
    'I choose not to answer'
  ];

  private static readonly MAX_MESSAGE_LENGTH: number = 500;

  private static readonly ORGANIZATION_TYPES: string[] = [
    'Community center',
    'Business location',
    'EMS Responders',
    'Police Precinct',
    'Fire Department'
  ];

  private static readonly QUANTITIES: string[] = [
    'I am not sure',
    '1-50',
    '51-100',
    '101-499',
    '500-1000',
    'More than 1,000'
  ];

  private static readonly NEED_BY_DATES: string[] = [
    'Within the next 3 business days',
    'Within the next 10 business days',
    'Within the next calendar month',
    'Requesting information for a future order',
  ];

  public error: string = null;

  private products: Products;

  public purchaseOrderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: BuyService,
    private b2bService: B2bService
  ) {
    this.setProducts = this.setProducts.bind(this);
    this.purchaseOrderForm = this.fb.group({
      organizationName: ['', Validators.required],
      organizationType: ['', Validators.required],
      signeeName: [''],
      contactName: ['', Validators.required],
      contactPhoneNumber: ['', [Validators.required, CustomValidatorsDirective.usPhoneNumber]],
      contactEmail: ['', [Validators.required, CustomValidatorsDirective.email]],
      requestedProductId: ['', Validators.required],
      quantityRange: ['', Validators.required],
      needByDate: ['', Validators.required],
      paidByGrant: ['', Validators.required],
      attributionSource: ['', Validators.required],
      preferredContactType: ['', Validators.required],
      message: ['', Validators.maxLength(PurchaseOrderFormComponent.MAX_MESSAGE_LENGTH)],
    });
  }

  ngOnInit() {
    this.service.featuredProducts().subscribe(this.setProducts);
  }

  public submit(form: any): void {
    if (this.purchaseOrderForm.invalid) {
      console.log('invalid');
      this.markFormGroupTouched(this.purchaseOrderForm);
      return;
    }

    this.b2bService.createBusinessPurchaseOrder(form).subscribe(
      (businessPurchaseOrder: IBusinessPurchaseOrder): void => {
        this.router.navigate([`/buy/b2b/confirm/${businessPurchaseOrder.id}`]);
      },
      (error: Error): void => {
        this.error = error.message;
      }
    );
  }

  public getAttributionSources(): string[] {
    return PurchaseOrderFormComponent.ATTRIBUTION_SOURCES;
  }

  public getNeedByDates(): string[] {
    return PurchaseOrderFormComponent.NEED_BY_DATES;
  }

  public getOrganizationTypes(): string[] {
    return PurchaseOrderFormComponent.ORGANIZATION_TYPES;
  }

  public getProducts(): Products {
    return this.products;
  }

  public getQuantities(): string[] {
    return PurchaseOrderFormComponent.QUANTITIES;
  }

  public getMaxMessageLength() {
    return PurchaseOrderFormComponent.MAX_MESSAGE_LENGTH;
  }

  public sectionInvalid(fieldName: string): boolean {
    return this.purchaseOrderForm.get(fieldName).touched
      && this.purchaseOrderForm.get(fieldName).invalid;
  }

  private setProducts(products: Products): void {
    this.products = products;
  }

  /**
   * Recursively mark all controls as touched.
   * @param formGroup - The form group to touch
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    _.values(formGroup.controls).forEach(control =>
      control.controls ? this.markFormGroupTouched(control) : control.markAsTouched());
  }
}
