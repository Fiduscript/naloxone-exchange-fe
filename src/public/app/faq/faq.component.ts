import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.pug',
  styleUrls: ['./faq.component.styl']
})
export class FaqComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // delay to ensure content was rendered before navigating to anchor
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
