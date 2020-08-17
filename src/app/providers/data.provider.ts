import { Injectable } from '@angular/core';
import { Column } from '../models/column';

@Injectable()
export class DataService {
    constructor() {}

    public getColumns(): Array<Column> {
        let retrievedData = localStorage.getItem('data');
        return JSON.parse(retrievedData);
    }

    public saveColumns(data: Array<Column>) {
        let dataToSave = JSON.stringify(data);
        localStorage.setItem('data', dataToSave);
    }
}
