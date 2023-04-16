import { Component } from '@angular/core';
import { Depense } from 'src/app/models/depense';

@Component({
  selector: 'app-depenses-table',
  templateUrl: './depenses-table.component.html',
  styleUrls: ['./depenses-table.component.scss']
})
export class DepensesTableComponent {
  public depenses: Depense[] = [];
  public mappedDepenses: Map<string, number> = new Map<string, number>(); 

  public constructor(){};

  public addDepenses(depenses: Depense[]):void {
    this.depenses = depenses;
   
    // Group expenses by author in a Map variable

    this.depenses.forEach(expenses => {
      if(this.mappedDepenses.has(expenses.getName())) {
        this.mappedDepenses.set(expenses.getName(), expenses.getRate()*expenses.getSpent()+this.mappedDepenses.get(expenses.getName())!)
      } else {
        this.mappedDepenses.set(expenses.getName(), expenses.getRate()*expenses.getSpent());
      }
    })

    console.log('map',this.mappedDepenses);

  }
}
