import { Component, Input, OnInit } from '@angular/core';

import { Pharmacy } from '../model/pharmacy';

@Component({
  selector: 'app-pharmacy-list-item',
  templateUrl: './pharmacy-list-item.component.pug',
  styleUrls: ['./pharmacy-list-item.component.styl']
})
export class PharmacyListItemComponent implements OnInit {
  @Input() pharmacy: Pharmacy;

  constructor() { }

  ngOnInit() {
  }

}
