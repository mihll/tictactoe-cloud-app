import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardSquare } from "../models/BoardSquare";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() square: BoardSquare;
  @Input() isSquareEnabled = false;
  @Output() squareClickedEvent = new EventEmitter<BoardSquare>();
  constructor() {
    this.square = {
      squareId: 0,
      content: ""
    }
  }

  ngOnInit(): void {
  }

  squareClicked() {
    this.squareClickedEvent.emit(this.square);
  }

}
