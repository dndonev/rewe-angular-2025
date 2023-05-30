import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ThirdComponent } from './third/third.component';

const routes: Routes = [
  {
    path: '',
    component: FirstComponent
  },
  {
    path: 'person',
    component: FirstComponent,
    children: [
      {
        path: 'details/:id',
        component: ThirdComponent
      },
    ]
  },
  {
    path: 'second',
    component: SecondComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
