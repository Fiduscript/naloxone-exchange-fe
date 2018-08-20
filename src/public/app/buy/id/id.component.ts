import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.pug',
  styleUrls: ['./id.component.styl']
})
export class IdComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
