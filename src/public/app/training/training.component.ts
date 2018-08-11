import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.pug',
  styleUrls: ['./training.component.styl']
})
export class TrainingComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //not used yet
    _.delay(_.bind(this.scrollToAnchor, this), 200);
  }

  private scrollToAnchor(): void {
    this.route.fragment.subscribe(((hash: string): void => {
      if(hash) {
        const cmp = document.getElementById(hash);
        if (cmp) {
          cmp.scrollIntoView();
        }
      }
    }))
  }
}