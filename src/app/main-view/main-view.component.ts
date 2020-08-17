import { Component, OnInit } from '@angular/core';
import { Column } from '../models/column';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DataService } from '../providers/data.provider';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  private originalData: Array<Column> = [];
  public columnsArray: Array<Column> = [];
  public searchValue: string = '';
  constructor(private dataProvider: DataService) { }

  ngOnInit(): void {
    let data = this.dataProvider.getColumns();
    if (data) {
      this.columnsArray = data;
    }
  }

  /**
   * method fired on type search values
   */
  public filter() {
    this.columnsArray = this.dataProvider.getFilteredCards(this.searchValue);
  }

  /**
   * addColumn- add a new column to the dashboard
   */
  public addColumn() {
    let index = this.columnsArray.length + 1;
    let connectedLists = [];
    if (this.columnsArray.length) {
      connectedLists = this.columnsArray[0].connectedLists;
      connectedLists.unshift('list-0');
    }
    let newOne: Column = {
      columnName: 'Columna ' + index,
      cards: [],
      connectedLists
    }
    this.columnsArray.push(newOne);
    this.connectLists();
    this.saveData();
  }

  /**
   * on delete column icon clicked on child component, 
   * we catch the event here to delete the column from our Array
   * @param index 
   */
  public deleteColumn(index: number) {
    this.columnsArray.splice(index,1);
    this.saveData();
  }

  /**
   * catch the drop event
   * @param event give us indexes to use for the movement
   */
  public drop(event: CdkDragDrop<string[]>) {
    if (event.container.id !== event.previousContainer.id)  {
      let previousColumnIndex = this.getIndex(event.previousContainer.id);
      let newColumnIndex = this.getIndex(event.container.id);
      let cardIndex = this.getIndex(event.item.element.nativeElement.id);
      // move between lists
      let card = this.removeAndReturnCard(previousColumnIndex, cardIndex);
      this.pushCardToColumn(card, newColumnIndex);
      this.saveData();
    }
  }

  /**
   * store data in localStorage throught data provider
   */
  public saveData() {
    this.dataProvider.saveColumns(this.columnsArray);
  }

  /**
   * for each existing column, connect the new column added
   */
  private connectLists() {
    let lastIndex = this.columnsArray.length - 1;
    this.columnsArray.forEach(column => {
      column.connectedLists.push('list-' + lastIndex);
    });
  }

  /**
   * delete the card moved from the column and return it
   * @param previousColumnIndex original column index
   * @param cardIndex card index where it was in the column
   */
  private removeAndReturnCard(previousColumnIndex: number, cardIndex: number): string {
    let card = (this.columnsArray[previousColumnIndex].cards).splice(cardIndex,1)[0];
    return card;
  }

  /**
   * add the card to the new column
   * @param card moved card
   * @param newColumnIndex new column's index
   */
  private pushCardToColumn(card: string, newColumnIndex: number) {
    this.columnsArray[newColumnIndex].cards.push(card);
  }

  /**
   * get index from ids
   * @param stringId html id
   */
  private getIndex(stringId: string): number {
    let stringIndex = stringId.split('-')[1];
    return parseInt(stringIndex,10);
  }

}
