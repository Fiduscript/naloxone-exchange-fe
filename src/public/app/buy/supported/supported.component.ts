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

  }

}
