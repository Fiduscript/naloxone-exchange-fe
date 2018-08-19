import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-supported',
  templateUrl: './supported.component.pug',
  styleUrls: ['./supported.component.styl']
})
export class SupportedComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // not used yet
    _.delay(_.bind(this.scrollToAnchor, this), 200);
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
