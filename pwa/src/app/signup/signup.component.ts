import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Amplify, { API } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import * as uuid from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  razerID: string;
  clientId: string;
  accountHolderKey: string;
  apiName = 'webapp';
  path = '/api';
  myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {}
  };

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nric: ['', Validators.required],
      birthdate: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      notifyvia: ['', Validators.required],
      preferredLanguage: ['', Validators.required],
      notes: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['']
    });
  }

  createdClientId: any;
  mockRazerId: any;
  mockAssignedBranchKey: string = '40288100720236180172023639d30115';
  mambuMockClient = {
    "client": {
      "firstName": "Celeste",
      "lastName": "Goh",
      "preferredLanguage": "ENGLISH",
      "notes": "Enjoys playing RPG",
      "assignedBranchKey": "40288100720236180172023639d30115"
    },
    "idDocuments": [
      {
        "identificationDocumentTemplateKey": "8a8e867271bd280c0171bf7e4ec71b01",
        "issuingAuthority": "Immigration Authority of Singapore",
        "documentType": "NRIC/Passport Number",
        "validUntil": "2021-09-12",
        "documentId": "S9812345A"
      }
    ],
    "addresses": [],
    "customInformation": [
      {
        "value": "Singapore",
        "customFieldID": "countryOfBirth"

      },
      {
        "value": "{{$guid}}",
        "customFieldID": "razerID"

      }
    ]
  }

  doSignUp(): void {

    // generate a guid to simulate RazerID
    let razerID = uuid.v4();
    this.razerID = uuid.v4();

    // draft post data
    let client = this.mambuMockClient;

    // update with form data
    client.client.firstName = this.firstFormGroup.get('firstName').value;
    client.client.lastName = this.firstFormGroup.get('lastName').value;
    client.client.notes = this.firstFormGroup.get('notes').value;
    client.customInformation.find(o => o.customFieldID === 'razerID').value = razerID;

    // Amplify API configs
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: this.mambuMockClient
    };

    //doSubmit
    API
      .post(this.apiName, '/api/mambu-clients', init)
      .then(response => {
        console.log(response)
        this.clientId = response.client.id;
        this.accountHolderKey = response.client.encodedKey;
      })
      .catch(error => {
        console.log(error.response);
      });

  }

  notifyOptions: any[] = [
    { value: 'email', viewValue: 'Email' },
    { value: 'phone', viewValue: 'Phone' },
    { value: 'mail', viewValue: 'Snail Mail' }
  ];

  languageOptions: any[] = [
    { value: 'ENGLISH', viewValue: 'English' },
    { value: 'DOGGO', viewValue: 'Doggo' }
  ];

}
