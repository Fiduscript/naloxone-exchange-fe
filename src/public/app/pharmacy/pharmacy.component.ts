import { Component, OnInit } from '@angular/core';

import { Pharmacies } from './model/pharmacies';
import { PharmacyService } from './pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.pug',
  styleUrls: ['./pharmacy.component.styl']
})
export class PharmacyComponent implements OnInit {

  public pharmacies: Pharmacies;

  constructor(private service: PharmacyService) { }

  public ngOnInit(): void {
    this.service.listPharmacies().subscribe((pharmacies: Pharmacies) => {
      this.pharmacies = pharmacies;
    });

  }

}
