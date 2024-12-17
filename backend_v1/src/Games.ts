import { Chess } from 'chess.js';
import { WebSocket } from 'ws';
import { GAME_OVER, INIT_GAME, MOVE } from './messages';

export class Game {
    public player1UserId: WebSocket;
    public player2UserId: WebSocket;
    public board: Chess;
    private startTime = new Date(Date.now());

    constructor(player1UserId: WebSocket, player2UserId: WebSocket, startTime?: Date) {
        console.log("Game Created");
        this.player1UserId = player1UserId;
        this.player2UserId = player2UserId;
        this.board = new Chess();
        if(startTime){
            this.startTime = startTime;
        }

        this.player1UserId.send(JSON.stringify({
            type: INIT_GAME,
            payload: {color: "white"}
        }));

        this.player2UserId.send(JSON.stringify({
            type: INIT_GAME,
            payload: {color: "black"}
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        // Validations:-
            // Which users move ?
            if (this.board.turn() === 'w' && socket !== this.player1UserId) {
                return;
            }
        
            if (this.board.turn() === 'b' && socket !== this.player2UserId) {
                return;
            }

            // Is it a valid move ?
        //THEN
            // Update the board
            // Push the move
            try{
                this.board.move(move);
                console.log("Move Succeeded");
            }catch(e){
                console.log("[Invalid Move Detected]",e);
                return; // Chess.js library will throw error if its an invalid move.
            }

            // Check if the game is over
            if (this.board.isGameOver()) {
                // Send game_over msg to both players
                this.player1UserId.emit(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: this.board.turn() === 'b' ? 'WHITE_WINS': 'BLACK_WINS'
                    }
                }));
                this.player2UserId.emit(JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: this.board.turn() === 'b' ? 'WHITE_WINS': 'BLACK_WINS'
                    }
                }));
                return;
              }

        // Send updated board to both the players
        if(this.board.moves().length % 2 === 0){
            console.log("Move sent to player-2");
            this.player2UserId.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }else{
            console.log("Move sent to player-1");
            this.player1UserId.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
    }
}
