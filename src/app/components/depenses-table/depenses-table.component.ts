import { Component } from '@angular/core';
import { Depense } from 'src/app/models/depense';

@Component({
  selector: 'app-depenses-table',
  templateUrl: './depenses-table.component.html',
  styleUrls: ['./depenses-table.component.scss']
})
export class DepensesTableComponent {
  public depenses: Depense[] = [];

  public constructor(){};

  public addDepenses(depenses: Depense[]):void {
    this.depenses = depenses;
    console.log('this depenses', this.depenses);
    

  }
}
