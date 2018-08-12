import { Component, OnInit } from '@angular/core';

import { PharmacyService } from './pharmacy.service';
import { Pharmacies } from '../../../../src/common/model/pharmacies';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.pug',
  styleUrls: ['./pharmacy.component.styl']
})
export class PharmacyComponent implements OnInit {

  private pharmacies: Pharmacies;

  constructor(private service: PharmacyService) { }

  public ngOnInit(): void {
    this.service.listPharmacies().subscribe((pharmacies: Pharmacies) => {
      this.pharmacies = pharmacies;
    });

  }

}
