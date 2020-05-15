import { Component, OnInit } from '@angular/core';
import { APIService } from '../api/amplify/API.service';
import Amplify, { API } from 'aws-amplify';
import { MambuService } from './../api/mambu/mambu.service';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(private apiService: APIService, private mambuService: MambuService) { }

  todos: Array<any>;
  apiName = 'webapp';
  path = '/api';
  myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {}
  };

  async ngOnInit() {
    this.apiService.ListTodos().then((evt) => {
      this.todos = evt.items;
    });

    this.apiService.OnCreateTodoListener.subscribe((evt) => {
      const data = (evt as any).value.data.onCreateTodo;
      this.todos = [...this.todos, data];
    });
  }

  testGET() {
    API
    .get(this.apiName, this.path, this.myInit)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response);
   });
  }

  testPOST() {
    API
    .post(this.apiName, this.path, this.myInit)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response);
   });
  }

  testPUT() {
    API
    .put(this.apiName, this.path, this.myInit)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response);
   });
  }

  testMambu() {
    API
    .get(this.apiName, '/api/mambu-getiddocument', this.myInit)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response);
   });
  }

  createTodo() {
    this.apiService.CreateTodo({
      name: 'Angular',
      description: 'testing'
    });
  }

}
