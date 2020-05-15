import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifestyleRoutingModule } from './lifestyle-routing.module';
import { LifestyleComponent } from './lifestyle.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [LifestyleComponent],
  imports: [
    CommonModule,
    LifestyleRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class LifestyleModule { }
