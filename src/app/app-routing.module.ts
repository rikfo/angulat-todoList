import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddListComponent } from './add-list/add-list.component';
import { ListsComponent } from './lists/lists.component';
import { ListEditGuard } from './listEdit-guard.service';

const routes: Routes = [
  {
    path: '' , redirectTo: '/lists', pathMatch: 'full'
  },
  {
    path: 'lists', component: ListsComponent,
  },
  {
    path: 'edit/:id', component: AddListComponent, canActivate: [ListEditGuard]
  },
  {
    path: 'addList', component: AddListComponent
  },
  {
    path: '**', redirectTo: '/lists', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
