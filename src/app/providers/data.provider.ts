import { Injectable } from '@angular/core';
import { Column } from '../models/column';

@Injectable()
export class DataService {
    constructor() {}

    /**
     * get data from localStorage
     */
    public getColumns(): Array<Column> {
        let retrievedData = localStorage.getItem('data');
        return JSON.parse(retrievedData);
    }

    /**
     * store data on localStorage
     * @param data data to store
     */
    public saveColumns(data: Array<Column>) {
        let dataToSave = JSON.stringify(data);
        localStorage.setItem('data', dataToSave);
    }

    /**
     * get data from LocalStorage and filter it
     * @param searchValue search value
     */
    public getFilteredCards(searchValue: string): Array<Column> {
        let columnsArray = [];
        let originalData = JSON.parse(localStorage.getItem('data'));
        if (searchValue.length) {
        originalData.forEach(column => {
            column.cards = this.filteredCards(column, searchValue);
            columnsArray.push(column);
        });
        } else {
            columnsArray = [...originalData];
        }
        return columnsArray;
    }

    /**
     * method to check if the card matches with the search value
     * @param column column to check
     * @param searchValue search value 
     */
    private filteredCards(column: Column, searchValue: string) {
        let cards = column.cards.filter(card => card.indexOf(searchValue) !== -1);
        return cards;
      }
}
