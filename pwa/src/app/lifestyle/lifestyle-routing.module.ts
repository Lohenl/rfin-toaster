import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifestyleComponent } from './lifestyle.component';

const routes: Routes = [{ path: '', component: LifestyleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifestyleRoutingModule { }
