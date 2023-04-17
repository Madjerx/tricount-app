import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportCsvComponent } from './components/import-csv/import-csv.component';
import { DepensesTableComponent } from './components/depenses-table/depenses-table.component';
import { CsvImportService } from './services/csv-import.service';


@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  public static routes: Routes = [
    {
      path: '',
      component: ImportCsvComponent
    },
    {
      path: '**', // all wrong url redirection
      redirectTo: '',
      pathMatch: 'full',
    }
  ]
}
