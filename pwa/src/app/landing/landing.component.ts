import { Component, OnInit } from '@angular/core';
// import { universalParallax } from 'universal-parallax';
declare var universalParallax: any;
// console.log(universalParallax);
// import * as up from 'universalParallax';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  up:any;

  constructor() { }

  ngOnInit(): void {
    this.up = new universalParallax().init({
      speed: 4
    });

  }
}
