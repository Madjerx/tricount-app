import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportCsvComponent } from './components/import-csv/import-csv.component';
import { DepensesTableComponent } from './components/depenses-table/depenses-table.component';


@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  public static routes: Routes = [
    {
      path: 'home',
      component: DepensesTableComponent 
     
    }
  ]
}
