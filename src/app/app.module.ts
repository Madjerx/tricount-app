import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportCsvComponent } from './components/import-csv/import-csv.component';
import { DepensesTableComponent } from './components/depenses-table/depenses-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportCsvComponent,
    DepensesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
