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
}
