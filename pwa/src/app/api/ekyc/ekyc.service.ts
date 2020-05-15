import { Injectable } from '@angular/core';
import { ApiconfigService } from './../config/apiconfig.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EkycService {

  constructor(private config:ApiconfigService, private http: HttpClient) { }


}
