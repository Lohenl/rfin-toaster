import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker'
declare var universalParallax: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  up:any;

  constructor( updates: SwUpdate ) {
    //TODO: Somehow subscribing to swupdate is sufficient to fix opaque SW image load :v
    updates.available.subscribe(event => {
      // console.log('current version is', event.current);
      // console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      // console.log('old version was', event.previous);
      // console.log('new version is', event.current);
    });
  }

  ngOnInit(): void {
    // run universal parallax JS
    this.up = new universalParallax().init({
      speed: 4
    });
  }
}
