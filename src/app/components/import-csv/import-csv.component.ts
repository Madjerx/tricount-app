import { Component, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import { Depense } from 'src/app/models/depense';
import { CsvImportService } from 'src/app/services/csv-import.service';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {

  public constructor(private csvService: CsvImportService) { }

  // method to get data from CSV into a Depense array 

  @Output() selectedDepenses: EventEmitter<Depense[]> = new EventEmitter<Depense[]>();

 
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

      console.log('objects = ', objects);
      console.log('obj0 = ', objects[0])

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
      console.log('depenses = ', depenses);
      this.selectedDepenses.emit(depenses);

    }

    reader.readAsText(file);
  }


}