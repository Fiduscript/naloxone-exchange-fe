import { Component, OnInit } from '@angular/core';

import { Pharmacies } from './model/pharmacies';
import { PharmacyService } from './pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacies.component.pug',
  styleUrls: ['./pharmacies.component.styl']
})
export class PharmaciesComponent implements OnInit {

  public pharmacies: Pharmacies;

  constructor(private service: PharmacyService) { }

  public ngOnInit(): void {
    this.service.listPharmacies().subscribe((pharmacies: Pharmacies) => {
      this.pharmacies = pharmacies;
    });

  }

}
