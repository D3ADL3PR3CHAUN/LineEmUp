import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  squares = Array(9).fill(null);
  player = '|';
  winner = null;

  constructor(public navCtrl: NavController) {

  }

  get gameStatusMessage(){
    return this.winner? `${this.winner} has won!` : 
    `${this.player}'s turn`;
  }

  handleMove(position) {
    if(!this.winner && !this.squares[position] ){
      this.squares[position] = this.player;
      if(this.winningMove()) {
        this.winner = this.player;
      }
      this.player = this.player === '|' ? '--' : '|';
    }
  }

  winningMove() {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let condition of conditions) {
        if ( this.squares[condition[0]]
            && this.squares[condition[0]] === this.squares[condition[1]]
            && this.squares[condition[1]] === this.squares[condition[2]]) {
              return true;
        }
    }
    return false;
  }

  restartGame() {
    this.squares = Array(9).fill(null);
    this.player = '|';
    this.winner = null;
  }

}