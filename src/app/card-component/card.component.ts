import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
  })
  export class CardComponent {
    @Input() cardDescription: string;
    @Input() cardIndex: number;
    constructor() { }
  }