import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';

import { BuyService } from '../buy.service';
import { Products } from '../model/products';

@Component({
  selector: 'app-buy-by-state',
  templateUrl: './buy-by-state.component.pug',
  styleUrls: ['./buy-by-state.component.styl']
})
export class BuyByStateComponent implements OnInit {

  public state: string;
  public products: Products;

  public constructor(
      private route: ActivatedRoute,
      private service: BuyService) { }

  public ngOnInit() {
    this.route.params.subscribe((params: Params): void => {
      this.state = params['state'];
      this.fetch();
    });
  }

  private fetch(): void {
    if (_.isEmpty(this.state)) { return; }

    this.service.stateProducts(this.state).subscribe(
        (products: Products): void => {
          this.products = products;
        }, (error: any): void => {
          // TODO: handle error
        });
  }
}
