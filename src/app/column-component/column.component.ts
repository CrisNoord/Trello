import { 
  Component, 
  OnChanges, 
  Input, 
  SimpleChanges, 
  Output, 
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Column } from '../models/column';

@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnChanges {

  @ViewChild('nameInput', {static: false}) nameInput : ElementRef;
  @Input() data: Column;
  @Input() columnIndex: number;
  @Output() onDeleteColumnClicked = new EventEmitter<number>();

  public columnTitle: string;
  public showInput: boolean = false;

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

  /**
   * method fired on click title label or on blur to show or hide
   * the input to change the column title
   * @param show value to assign
   */
  public toggleInputText(show: boolean) {
    this.showInput = show;
    if (this.showInput) {
      setTimeout(() => this.nameInput.nativeElement.focus());
    }
  }
}