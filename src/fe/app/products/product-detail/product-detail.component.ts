import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import * as _ from 'lodash';

import { ProductsService } from '../products.service';
import { ProductDetail } from '../model/product-detail';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.pug',
  styleUrls: ['../products.component.styl']
})
export class ProductDetailComponent implements OnInit {

  private id: string;
  private product: ProductDetail;

  public constructor(
      private service: ProductsService,
      private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      this.id = params['id'];
      this.fetch();
    });

    // defer this task until the DOM has been rendered so there
    // is something to scroll to
    _.delay(_.bind(this.scrollToAnchor, this), 200);
  }

  public canRender(): boolean {
    return !_.isEmpty(this.id) && this.product != null;
  }

  private fetch(): void {
    if (_.isEmpty(this.id)) return;
    this.service.getProduct(this.id).subscribe((product: ProductDetail): void => {
      this.product = product;
    })
  }

  private scrollToAnchor(): void {
    this.route.fragment.subscribe((hash: string): void => {
      if (hash) {
        const cmp = document.getElementById(hash);
        if (cmp) {
          cmp.scrollIntoView();
        }
      }
    })
  }
}
