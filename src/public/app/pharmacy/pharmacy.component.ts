import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.pug',
  styleUrls: ['./pharmacy.component.styl']
})
export class PharmacyComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  	// defer this task until the DOM has been rendered so there
    // is something to scroll to
    _.delay(_.bind(this.scrollToAnchor, this), 200);
  }

  private scrollToAnchor(): void {
    this.route.fragment.subscribe((hash: string): void => {
      if (hash) {
        const cmp = document.getElementsByTagName(hash)[0];
        if (cmp) {
          cmp.scrollIntoView();
        }
      }
    });
  }

}
