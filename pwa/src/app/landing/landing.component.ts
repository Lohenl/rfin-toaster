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
    //TODO: Doesnt work on Amplify :(
    //TODO DODO DODO DODODO DOOOOO: Hash Routing strategy solved non-pwa sticky-activated router 
    //DODODODO: Would need to see if doUPRender should be on cons or ngoninit
    console.log('LC constructor up.init()');
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    this.doUPRender();
  }

  ngOnInit(): void {
    console.log('LC ngoninit up.init()');
    this.doUPRender();
  }

  doUPRender(): void {
    // run universal parallax JS
    console.log('doUPRender()');
    this.up = new universalParallax().init({
      speed: 4
    });
  }
}
