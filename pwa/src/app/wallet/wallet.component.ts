import { Component, OnInit } from '@angular/core';
import { APIService } from '../api/amplify/API.service';
import Amplify, { API } from 'aws-amplify';
import { MambuService } from './../api/mambu/mambu.service';
import awsconfig from '../../aws-exports';
import * as uuid from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

Amplify.configure(awsconfig);

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private apiService: APIService, private mambuService: MambuService) { }

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

    this.firstFormGroup = this._formBuilder.group({
      transferSendingAccount: [''],
      transferReceivingAccount: [''],
      transferAmount: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      allTxAcctQueryId: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      acctHolderId: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      loanId: ['']
    });
    this.fifthFormGroup = this._formBuilder.group({
      fixedDepositAcctId: ['']
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
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  testMambu2() {
    API
      .get(this.apiName, '/api/mambu-transactionchannels', this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

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

  guid: string;
  clientId: string;
  lastResponse: string;
  accountHolderKey: string;
  accountId: string;

  testMambu3() {
    // generate a guid because this is not postman
    let myId = uuid.v4();
    this.guid = myId;
    // replace placeholder with a mock guid
    this.mambuMockClient.customInformation.find(o => o.customFieldID === 'razerID').value = myId;

    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: this.mambuMockClient
    };

    API
      .post(this.apiName, '/api/mambu-clients', init)
      .then(response => {
        console.log(response)
        this.clientId = response.client.id;
        this.accountHolderKey = response.client.encodedKey;
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });

  }

  mockSavingsAccount = {
    "savingsAccount": {
      "name": "Digital Account",
      "accountHolderType": "CLIENT",
      "accountHolderKey": "{{clientId}}",
      "accountState": "APPROVED",
      "productTypeKey": "8a8e878471bf59cf0171bf6979700440",
      "accountType": "CURRENT_ACCOUNT",
      "currencyCode": "SGD",
      "allowOverdraft": "true",
      "overdraftLimit": "100",
      "overdraftInterestSettings": {
        "interestRate": 5
      },
      "interestSettings": {
        "interestRate": "1.25"
      }
    }
  }

  testMambu4() {
    let savingsAccount = this.mockSavingsAccount;
    savingsAccount.savingsAccount.accountHolderKey = this.accountHolderKey;
    console.log(savingsAccount.savingsAccount.accountHolderKey);
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: savingsAccount
    };

    API
      .post(this.apiName, '/api/mambu-savings', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
        this.accountId = response.savingsAccount.id;
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });

  }

  mockTransaction = {
    "amount": 200,
    "notes": "Deposit into savings account",
    "type": "DEPOSIT",
    "method": "bank",
    "customInformation": [
      {
        "value": "unique identifier for receipt",
        "customFieldID": "IDENTIFIER_TRANSACTION_CHANNEL_I"
      }
    ]
  }

  testMambu5() {
    let transaction = this.mockTransaction;
    console.log(transaction)
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: transaction
    };
    API
      .post(this.apiName, '/api/mambu-savings/' + this.accountId + '/transactions', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  mockTransfer = {
    "type": "TRANSFER",
    "amount": "1",
    "notes": "Transfer to Expenses Account",
    "toSavingsAccount": "OCZX214",
    "method": "bank"
  }

  testMambu6() {
    let transfer = this.mockTransfer;
    let transferSendingAccount = this.firstFormGroup.get('transferSendingAccount').value;
    let transferReceivingAccount = this.firstFormGroup.get('transferReceivingAccount').value;
    let transferAmount = this.firstFormGroup.get('transferAmount').value;
    transfer.amount = transferAmount;
    transfer.toSavingsAccount = transferReceivingAccount;
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: transfer
    };
    API
      .post(this.apiName, '/api/mambu-savings/' + transferSendingAccount + '/transactions', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  getAllTxForCurrentAccount() {
    let account = this.secondFormGroup.get('allTxAcctQueryId').value;
    API
      .get(this.apiName, '/api/mambu-savings/' + account + '/transactions', this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  getOneTxByTxId() {
    let account = this.secondFormGroup.get('allTxAcctQueryId').value;
    API
      .get(this.apiName, '/api/mambu-savings/' + account + '/transactions?offset=0&limit=1', this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  getCurrentAcctById() {
    let account = this.secondFormGroup.get('allTxAcctQueryId').value;
    API
      .get(this.apiName, '/api/mambu-savings/' + account, this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  mockLoan = {
    "loanAccount": {
      "accountHolderType": "CLIENT",
      "accountHolderKey": "8a8e879472175064017219acd65c2478",
      "productTypeKey": "8a8e867271bd280c0171bf768cc31a89",
      "assignedBranchKey": "40288100720236180172023639d30115",
      "loanName": "Student Loan",
      "loanAmount": 1010,
      "interestRate": "2",
      "arrearsTolerancePeriod": "0",
      "gracePeriod": "0",
      "repaymentInstallments": "10",
      "repaymentPeriodCount": "1",
      "periodicPayment": "0",
      "repaymentPeriodUnit": "WEEKS",
      "disbursementDetails": {
        "customInformation": [
          {
            "value": "unique identifier for this transaction",
            "customFieldID": "IDENTIFIER_TRANSACTION_CHANNEL_I"
          }
        ]
      }
    }
  }

  createLoanAccount() {
    let loan = this.mockLoan;
    let acctHolderId = this.thirdFormGroup.get('acctHolderId').value;
    loan.loanAccount.accountHolderKey = acctHolderId;
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: loan
    };
    API
      .post(this.apiName, '/api/mambu-loans/', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  mockLoanDisbursement = {
    "type": "DISBURSEMENT",
    "method": "bank",
    "customInformation": [
      {
        "value": "unique identifier for transaction",
        "customFieldID": "IDENTIFIER_TRANSACTION_CHANNEL_I"
      }
    ]
  }
  disburseLoanToSavingsAcct() {
    let loanDisbursement = this.mockLoanDisbursement;
    let loanId = this.fourthFormGroup.get('loanId').value;
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: loanDisbursement
    };
    API
      .post(this.apiName, '/api/mambu-loans/' + loanId + '/transactions', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  mockFee = {
    "type": "FEE",
    "amount": "5",
    "notes": "string"
  }

  applyFeeToLoanAccount() {
    let fee = this.mockFee;
    let loanId = this.fourthFormGroup.get('loanId').value;
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: fee
    };
    API
      .post(this.apiName, '/api/mambu-loans/' + loanId + '/transactions', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  getAllTxForLoanAccount() {
    let loanId = this.fourthFormGroup.get('loanId').value;
    API
      .get(this.apiName, '/api/mambu-loans/' + loanId + '/transactions', this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  getOneTxByLoanId() {
    let loanId = this.fourthFormGroup.get('loanId').value;
    API
      .get(this.apiName, '/api/mambu-loans/' + loanId + '/transactions?offset=0&limit=1', this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  getLoanAccount() {
    let loanId = this.fourthFormGroup.get('loanId').value;
    API
      .get(this.apiName, '/api/mambu-loans/' + loanId, this.myInit)
      .then(response => {
        console.log(response);
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  mockFixedDepositAccount = {
    "savingsAccount": {
      "notes": "",
      "name": "Fixed Deposit Account",
      "accountHolderType": "CLIENT",
      "accountHolderKey": "{{clientId}}",
      "accountState": "APPROVED",
      "productTypeKey": "8a8e867271bd280c0171bf768b9c1a81",
      "assignedBranchKey": "40288100720236180172023639d30115",
      "accountType": "FIXED_DEPOSIT",
      "currencyCode": "SGD",
      "interestSettings": {
        "interestRate": "2"
      }
    }
  }

  createFixedDepositAcct() {
    let fixedDepositAcct = this.mockFixedDepositAccount;
    fixedDepositAcct.savingsAccount.accountHolderKey = this.accountHolderKey;
    let accountHolder = this.thirdFormGroup.get('acctHolderId').value;
    fixedDepositAcct.savingsAccount.accountHolderKey = accountHolder;
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: fixedDepositAcct
    };

    API
      .post(this.apiName, '/api/mambu-savings', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
        this.accountId = response.savingsAccount.id;
      })
      .catch(error => {
        console.log(error.response);
        this.lastResponse = '';
      });

  }

  mockFixedDepositDeposit = {
    "amount": 5,
    "notes": "Deposit into Fixed Deposit account",
    "type": "DEPOSIT",
    "method": "bank",
    "customInformation": [
      {
        "value": "unique identifier for receipt",
        "customFieldID": "IDENTIFIER_TRANSACTION_CHANNEL_I"
      }
    ]
  }

  depositToFixedDepositAccount() {
    let transaction = this.mockFixedDepositDeposit;
    let fixedDepositAcctId = this.fifthFormGroup.get('fixedDepositAcctId').value;
    console.log(transaction)
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: transaction
    };
    API
      .post(this.apiName, '/api/mambu-savings/' + fixedDepositAcctId + '/transactions', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  mockStartMaturityDate = {
    "type": "START_MATURITY",
    "valuedate": "2020-04-26",
    "notes": "string"
  }

  startMaturityDate() {
    let transaction = this.mockStartMaturityDate;
    let fixedDepositAcctId = this.fifthFormGroup.get('fixedDepositAcctId').value;
    console.log(transaction)
    let init = {
      headers: {}, // OPTIONAL
      response: false, // OPTIONAL (return the entire Axios response object instead of only response.data)
      queryStringParameters: {},
      body: transaction
    };
    API
      .post(this.apiName, '/api/mambu-savings/' + fixedDepositAcctId + '/transactions', init)
      .then(response => {
        console.log(response)
        this.lastResponse = JSON.stringify(response);
      })
      .catch(error => {
        console.log(error)
        console.log(error.response);
        this.lastResponse = '';
      });
  }

  createTodo() {
    this.apiService.CreateTodo({
      name: 'Angular',
      description: 'testing'
    });
  }

}
