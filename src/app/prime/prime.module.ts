import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {GrowlModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {CardModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';



@NgModule({
  imports: [
    CardModule, InputTextModule, AutoCompleteModule, ButtonModule,
    ScheduleModule, GrowlModule, MatTabsModule, MatSidenavModule, MatTableModule
  ],
  exports: [
    CardModule, InputTextModule, AutoCompleteModule, ButtonModule,
    ScheduleModule, GrowlModule, MatTabsModule, MatSidenavModule, MatTableModule
  ]
})
export class PrimeModule {
}
