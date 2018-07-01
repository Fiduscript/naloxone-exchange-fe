import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact', // is this needed?
  templateUrl: './contact.component.pug'
})
export class ContactComponent implements OnInit {

  public constructor() { }

  public ngOnInit() { }

  public onSubmit() {
    alert('test!');
  }
}
