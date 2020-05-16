import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const PERSONAL_DATA: any[] = [
  { age: 25, class: 'Dynamo', chara: 'Dynamos have need for speed, a taste for the finer things in life, and a high risk appetite. TELLER suggests balancing out your investment portfolio with low-risk investments.' }
]

const PERKS_DATA: any[] = [
  { perk: 'Agility', effect: '-15% Forex fees', condition: 'NIL' },
  { perk: 'Enhanced Grocery Cashback', effect: '+5% Cashback on purchases with Giant and Cold Storage', condition: 'Purchases have to be made on an eligible credit card' },
  { perk: 'Fixed Deposit Plus', effect: '+5% to maximum cash you can put in Fixed Deposits', condition: 'NIL' },
  { perk: 'Enhanced Credit Card Cashback', effect: '+8% cashback on credit card purchases', condition: 'Purchases have to be made on an eligible credit card' },
  { perk: 'Frequent Flyer', effect: '+20% miles accumulation from airline programs', condition: 'Only with participating airlines' }
]

const TX_DATA: any[] = [
  { date: '28 APR 2020', desc: 'RZR-334-786', amt: '112.00' },
  { date: '3 MAY 2020', desc: 'RZR-224-232', amt: '99.00' },
  { date: '17 MAY 2020', desc: 'RZR-112-444', amt: '66.00' },
]

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clientName = "Jackson Jin Oo Lui";

  headeropenacct = false;
  headeropencc = false;
  headeropenloan = false;
  headeropeninsurance = false;
  headeropeninvestment = false;
  headeropenperks = false;
  headeropenuser = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  personalDataDisplayedColumns: string[] = ['age', 'class', 'chara'];
  personalDataSource = PERSONAL_DATA;

  perksDataDisplayedColumns: string[] = ['perk', 'effect', 'condition'];
  perksDataSource = PERKS_DATA;

  txDisplayedColumns: string[] = ['date', 'desc', 'amt'];
  txSource = TX_DATA;
}
