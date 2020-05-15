import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifestyleRoutingModule } from './lifestyle-routing.module';
import { LifestyleComponent } from './lifestyle.component';


@NgModule({
  declarations: [LifestyleComponent],
  imports: [
    CommonModule,
    LifestyleRoutingModule
  ]
})
export class LifestyleModule { }
