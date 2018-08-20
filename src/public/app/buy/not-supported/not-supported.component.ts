import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-not-supported',
  templateUrl: './not-supported.component.pug',
  styleUrls: ['./not-supported.component.styl']
})
export class NotSupportedComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
