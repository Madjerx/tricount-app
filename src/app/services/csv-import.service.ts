import { Injectable } from '@angular/core';
import { Depense } from '../models/depense';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  constructor() { }

  // Set depense into localStorage

  public setDepensesToLocalStorage(depenses: any[]): void {
    localStorage.setItem('depenses', JSON.stringify(depenses));
  }

  // Get depense from localStorage

  public getDepensesFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('depenses') || '[]');
  }

  // Cea  
}
