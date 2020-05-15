import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiconfigService {

  ekycConfigs: any;
  mambuConfigs: any;
  perxConfigs: any;
  visaConfigs: any;

  constructor() {
    this.init(environment);
  }

  //TODO: See if env.prod.ts needs to be .gitignored (meh)
  init(environment) {
    this.ekycConfigs = environment.ekycConfigs;
    this.mambuConfigs = environment.mambuConfigs;
    this.perxConfigs = environment.perxConfigs;
    this.visaConfigs = environment.visaConfigs;
  }

  getEKYCConfigs() {
    return this.ekycConfigs;
  }

  getMambuConfigs() {
    return this.mambuConfigs;
  };

  getPerxConfigs() {
    return this.perxConfigs;
  }

  getVisaConfigs(){
    return this.visaConfigs;
  }
}
