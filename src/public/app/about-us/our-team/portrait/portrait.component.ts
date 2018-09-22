import { Component, Input, OnInit } from '@angular/core';
import { IPerson } from '../model/person';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.pug',
  styleUrls: ['./portrait.component.styl']
})
export class PortraitComponent implements OnInit {

  @Input() public person: IPerson;

  constructor() { }

  ngOnInit() {
  }

}
