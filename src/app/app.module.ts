import {HttpClientModule} from '@angular/common/http';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {DataService} from './data.service';
import {FinalComponent} from './final/final.component';
import {PrimeModule} from './prime/prime.module';
import {ShowFinalComponent} from './show-final/show-final.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    AppComponent, ShowFinalComponent, FinalComponent, CalendarViewComponent,
    CalendarViewComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    PrimeModule,
    FormsModule,

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
