import { Injectable } from '@angular/core';
import { ApiconfigService } from './../config/apiconfig.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MambuService {

  url: string;
  teamname: string;
  password: string;

  constructor(private config: ApiconfigService, private http: HttpClient) {
    this.init();
    console.log(this.url);
  }

  private init(){
    let config = this.config.getMambuConfigs();
    this.url = config.url;
    this.teamname = config.teamname;
    this.password = config.password;
  }

  getIDDocument(): any {
    this.http.get(this.url+'api/clients/123123?fullDetails=true')
      .subscribe(data => {
        console.log(data);
        return data;
      })
  }
}
