import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoobplaceholderRoutingModule } from './shoobplaceholder-routing.module';
import { ShoobplaceholderComponent } from './shoobplaceholder.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ShoobplaceholderComponent],
  imports: [
    CommonModule,
    ShoobplaceholderRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ShoobplaceholderModule { }
