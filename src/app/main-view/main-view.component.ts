import { Component, OnInit } from '@angular/core';
import { Column } from '../models/column';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  public columnsArray: Array<Column> = [];
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * addColumn- add a new column to the dashboard
   */
  public addColumn() {
    let index = this.columnsArray.length + 1;
    let newOne: Column = {
      columnName: 'Columna ' + index,
      cards: []
    }
    this.columnsArray.push(newOne);
  }

  /**
   * on delete column icon clicked on child component, 
   * we catch the event here to delete the column from our Array
   * @param index 
   */
  public deleteColumn(index: number) {
    this.columnsArray.splice(index,1);
  }

}
