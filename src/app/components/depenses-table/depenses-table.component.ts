import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Depense } from 'src/app/models/depense';
import { CsvImportService } from 'src/app/services/csv-import.service';

@Component({
  selector: 'app-depenses-table',
  templateUrl: './depenses-table.component.html',
  styleUrls: ['./depenses-table.component.scss']
})
export class DepensesTableComponent implements OnInit {
  public depenses: Depense[] = [];
  public mappedDepenses: Map<string, number> = new Map<string, number>();
  public indebted: string = '';
  public creditor: string = '';
  public amountToGive: number = 0;
  public fileLoaded: boolean = true;

  ngOnInit(): void {
    this.depenses = this.csvService.getDepenses().map(depense => {
      const depenseObj: Depense = new Depense();
      const date0bj: Date = new Date(depense['date']);
      depenseObj.setName(depense['name']);
      depenseObj.setDate(date0bj);
      depenseObj.setCategory(depense['category']);
      depenseObj.setRate(depense['rate']);
      depenseObj.setSpent(depense['spent']);
      return depenseObj;
    });

    console.log('depenses type', this.depenses);
    console.log('typeof depenses[0]', typeof this.depenses[0]);

    console.log('depenses 0 getname', this.depenses[0].getDate());

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

  public constructor(private csvService: CsvImportService) { };


}
