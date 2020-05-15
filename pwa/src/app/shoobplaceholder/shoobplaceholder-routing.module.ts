import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoobplaceholderComponent } from './shoobplaceholder.component';

const routes: Routes = [{ path: '', component: ShoobplaceholderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoobplaceholderRoutingModule { }
