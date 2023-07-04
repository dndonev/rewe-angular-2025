import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { StoreModule } from '@ngrx/store'

import { reducer } from './state/counter.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ counter: reducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
