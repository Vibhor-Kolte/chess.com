import { WebSocket } from 'ws';

export class Game {
    public player1UserId: WebSocket;
    public player2UserId: WebSocket | null;
    public board: string;
    private startTime = new Date(Date.now());

    constructor(player1UserId: WebSocket, player2UserId: WebSocket | null, startTime?: Date) {
        this.player1UserId = player1UserId;
        this.player2UserId = player2UserId;
        this.board = "";
        if(startTime){
            this.startTime = startTime;
        }
    }

    makeMove(socket: WebSocket, move: string) {
        // Validations:-
            // Which users move ?
            // Is it a valid move ?
        //THEN
            // Update the board
            // Push the move
            // Check if the game is over
        // Send updated board to both the players
        

    }
}
