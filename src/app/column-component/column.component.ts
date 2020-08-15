import { 
  Component, 
  OnChanges, 
  Input, 
  SimpleChanges, 
  Output, 
  EventEmitter
} from '@angular/core';
import { Column } from '../models/column';

@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnChanges {

  @Input() data: Column;
  @Input() columnIndex: number;
  @Output() onDeleteColumnClicked = new EventEmitter<number>();

  public columnTitle: string;

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
        this.columnTitle = this.data.columnName;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.hasOwnProperty('data')) {
        if (this.data) {
            this.columnTitle = this.data.columnName;
        }
      }
  }

  /**
   * method fired on click delete column icon
   */
  public deleteColumn() {
    this.onDeleteColumnClicked.emit(this.columnIndex);
  }
}