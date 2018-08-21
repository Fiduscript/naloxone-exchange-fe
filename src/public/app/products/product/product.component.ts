import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

import { BuyService } from '../../buy/buy.service';
import { Product } from '../../buy/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.pug',
  styleUrls: ['../products.component.styl']
})
export class ProductComponent implements OnInit {

  private id: string;
  private product: Product;

  public constructor(
      private service: BuyService,
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
    if (_.isEmpty(this.id)) { return; }
    // this.service.getProduct(this.id).subscribe((product: Product): void => {
    //   this.product = product;
    // });
  }

  private scrollToAnchor(): void {
    this.route.fragment.subscribe((hash: string): void => {
      if (hash) {
        const cmp = document.getElementById(hash);
        if (cmp) {
          cmp.scrollIntoView();
        }
      }
    });
  }
}
