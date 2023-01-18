import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardSquare } from "../models/BoardSquare";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: BoardSquare[] = [];
  @Input() isMoveEnabled: boolean = false;
  @Output() squareClickedEvent = new EventEmitter<BoardSquare>();
  constructor() { }

  ngOnInit(): void {
  }

  squareClicked(square: BoardSquare) {
    this.squareClickedEvent.emit(square);
  }

}
