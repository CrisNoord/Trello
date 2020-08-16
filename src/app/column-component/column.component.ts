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
import { ICard } from '../models/card';

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
  public cards: Array<string> = [];
  public showInput: boolean = false;
  public creatingCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.data) {
        this.columnTitle = this.data.columnName;
        this.cards = this.data.cards;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.hasOwnProperty('data')) {
        if (this.data) {
            this.columnTitle = this.data.columnName;
            this.cards = this.data.cards;
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

  /**
   * on enter key pressed, make blur to editor name input
   */
  public loseFocus() {
    this.nameInput.nativeElement.blur();
  }

  /**
   * method fired on clicking add new card button
   */
  public addCard() {
    this.cards.push('');
    this.creatingCard = true;
  }

  /**
   * metthod fired on click delete card, or on create an empty card
   * @param index index of card to delete
   */
  public deleteCard(index:number) {
    this.cards.splice(index,1);
    this.creatingCard = false;
  }

  /**
   * on edit card or create a new one, we update our cards array
   * @param data info with description to update and card's index to update
   */
  public updateColumn(data: ICard) {
    this.cards[data.cardIndex] = data.cardDescription;
    this.creatingCard = false;
  }
}