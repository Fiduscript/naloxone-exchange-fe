import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    'Other'
  ];

  private static readonly ORGANIZATION_TYPES: string[] = [
    'Community center or business location',
    'EMS Responders',
    'Police Precinct',
    'Fire Department',
    'Other'
  ];

  private static readonly QUANTITIES: string[] = [
    'I am not sure',
    '1-50',
    '51-100',
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
      signeeName: ['', Validators.required],
      contactName: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
      contactEmail: ['', Validators.required],
      requestedProductId: ['', Validators.required],
      quantityRange: ['', Validators.required],
      needByDate: ['', Validators.required],
      paidByGrant: ['', Validators.required],
      attributionSource: ['', Validators.required],
      preferredContactType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.service.featuredProducts().subscribe(this.setProducts);
  }

  public submit(form: any): void {
    if (this.purchaseOrderForm.invalid) {
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

  private setProducts(products: Products): void {
    this.products = products;
  }
}
