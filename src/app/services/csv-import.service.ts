import { Injectable } from '@angular/core';
import { Depense } from '../models/depense';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CsvImportService {

  constructor() { }

  private depenses: Depense[] = [];

  public setDepenses(depenses: any[]): void {
    localStorage.setItem('depenses', JSON.stringify(depenses));
  }

  public getDepenses(): any[] {
    console.log('get called', JSON.parse(localStorage.getItem('depenses') || '[]'));
    
    return JSON.parse(localStorage.getItem('depenses') || '[]');
  }
}
