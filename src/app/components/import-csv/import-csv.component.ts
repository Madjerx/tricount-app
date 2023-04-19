import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Depense } from 'src/app/models/depense';
import { CsvImportService } from 'src/app/services/csv-import.service';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent implements OnInit {

  public fileLoaded: boolean = false;
  public onLoad: boolean = false;
  public faCheck = faCheck;
  public faXmark = faXmark;
  public ngSwitch: string = '';


  public constructor(private csvService: CsvImportService,
    private router: Router) { }


  ngOnInit(): void {
    // check if expenses array stored localy

    if (this.csvService.getDepensesFromLocalStorage().length > 0) {
      this.fileLoaded = true;
    }

  }

  // method to get data from CSV into a Depense array 
  onFileSelected(event: any): void {

    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result as string;

      // Parse the CSV data 
      const rows = csvData.split('\r\n');

      // Remove the last row if it is empty
      if (rows[rows.length - 1] === '') {
        rows.pop();
      }

      // transform data in a array of objects with csv headers as properties and row as values
      const headers = rows[0].split(';');
      const values = rows.slice(1).map(
        row => row.split(';'));
      const objects = values.map(value => {
        const obj: { [key: string]: any } = {};
        headers.forEach((header, index) => {
          const numericValue = Number(value[index]);
          obj[header] = isNaN(numericValue) ? value[index] : numericValue;

        })
        return obj;
      })


      // Convert objects from csv into an array of my Depense Class
      const depenses: Depense[] = objects.map(depense => {
        const depenseObj: Depense = new Depense();
        const date0bj: Date = moment(depense['date'], 'DD/MM/YYYY').toDate();
        depenseObj.setName(depense['name']);
        depenseObj.setDate(date0bj);
        depenseObj.setCategory(depense['category']);
        depenseObj.setRate(depense['rate']);
        depenseObj.setSpent(depense['spent']);
        return depenseObj;
      })
      this.csvService.setDepensesToLocalStorage(depenses);

    }

    reader.readAsText(file);

    this.ngSwitch = 'loading';
    setTimeout(() => {
      this.ngSwitch = 'loaded';
    },
      700);
  }

  public reload(): void {
    this.csvService.clearLocalStorage();
    this.ngSwitch = 'loading';
    setTimeout(() => {
      this.ngSwitch = '';

    },
      700);
    // window.location.reload();

  }
}
