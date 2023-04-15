import { Component } from '@angular/core';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {


  onFileSelected(event: any): void {



    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();


    reader.onload = () => {

      const csvData = reader.result as string;

      // Parse the CSV data 
      const rows = csvData.split('\r\n');
      const headers = rows[0].split(';');
      const values = rows.slice(1).map(
        row => row.split(';'));
      const objects = values.map(value => {
        const obj: { [key: string]: any } = {};
        headers.forEach((header, index) => obj[header] = value[index]);
        return obj;
      })

      console.log('objects = ', objects);

    }

    reader.readAsText(file);

  }

}
