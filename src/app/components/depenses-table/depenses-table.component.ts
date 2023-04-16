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
  public indebted: string = '';
  public creditor: string = '';
  public amountToGive: number = 0;
  public fileLoaded: boolean = false;


  public constructor() { };

  public addDepenses(depenses: Depense[]): void {
    this.depenses = depenses;
    this.fileLoaded = true;

    // Group expenses by author in a Map variable

    this.depenses.forEach(expenses => {
      if (this.mappedDepenses.has(expenses.getName())) {
        this.mappedDepenses.set(expenses.getName(), expenses.getRate() * expenses.getSpent() + this.mappedDepenses.get(expenses.getName())!)
      } else {
        this.mappedDepenses.set(expenses.getName(), expenses.getRate() * expenses.getSpent());
      }
    })


    // Get author in debt

    const authorArray: string[] = [...this.mappedDepenses.keys()];
    console.log(authorArray);
    if (this.mappedDepenses.get(authorArray[0])! > this.mappedDepenses.get(authorArray[1])!) {
      this.indebted = authorArray[1];
      this.creditor = authorArray[0];
    } else {
      this.indebted = authorArray[0];
      this.creditor = authorArray[1];
    }

    // Get amount to give

    this.amountToGive = Math.abs(this.mappedDepenses.get(authorArray[0])! - this.mappedDepenses.get(authorArray[1])!)





  }
}
