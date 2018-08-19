import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IState } from 'src/common/constant/states';
import { STATE_SET } from 'src/common/constant/states';
import { StateService } from './state.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.pug',
  styleUrls: ['./buy.component.styl']
})
export class BuyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private stateService: StateService) { }

  ngOnInit() {
    this.getStates();
    // not used yet
    _.delay(_.bind(this.scrollToAnchor, this), 200);
  }

  getStates(): void {
      this.stateService.getStates();
  }

  private scrollToAnchor(): void {
    this.route.fragment.subscribe(((hash: string): void => {
      if (hash) {
        const cmp = document.getElementById(hash);
        if (cmp) {
          cmp.scrollIntoView();
        }
      }
    }));
  }

}
