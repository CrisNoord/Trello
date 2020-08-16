import { 
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ICard } from '../models/card';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
  })
  export class CardComponent implements OnInit{

    @ViewChild('nameEditor', {static: false}) nameEditor: ElementRef;
    @Input() cardDescription: string;
    @Input() cardIndex: number;
    @Output() onDeleteClicked = new EventEmitter<number>()
    @Output() onUpdateCard = new EventEmitter<ICard>();
    
    public showCardNameEditor: boolean;

    constructor() { }

    ngOnInit(): void {
      this.showCardNameEditor = true;
      setTimeout(() => this.nameEditor.nativeElement.focus());
    }

    /**
     * method fired on loose focus or click label to edit description
     * @param show value to hide/show the name editor
     */
    public toggleNameEditor(show: boolean) {
      this.showCardNameEditor = show;
      if (this.showCardNameEditor) {
        setTimeout(() => this.nameEditor.nativeElement.focus());
      } else {
        this.checkForCardDeletion();
      }
    }

    /**
     * method fired on enter pressed
     */
    public loseFocus() {
      this.nameEditor.nativeElement.blur();
      this.showCardNameEditor = false;
    }

    /**
     * method to check if card is empty
     * if yes, we delete it from the column we are working on
     * if not, we update our column
     */
    private checkForCardDeletion() {
      if (!this.cardDescription || !this.cardDescription.length) {
        this.onDeleteClicked.emit(this.cardIndex);
      } else {
        this.onUpdateCard.emit({cardIndex: this.cardIndex, cardDescription: this.cardDescription});

      }
    }

  }