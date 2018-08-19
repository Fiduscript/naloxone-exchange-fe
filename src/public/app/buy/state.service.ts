import { Injectable } from '@angular/core';
import { IState } from 'src/common/constant/states';
import { STATES } from 'src/common/constant/states';

@Injectable({
  providedIn: 'root'
})

export class StateService {

  constructor() { }

  getStates(): IState[] {
    return STATES;
  }
}