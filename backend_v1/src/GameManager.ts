import { WebSocket } from 'ws';
import { INIT_GAME, MOVE } from './messages';
import { Game } from './Games';

export class GameManager {
  private games: Game[];  // maintaining global array of all active games
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(user: WebSocket) {
    this.users.push(user);
    this.addHandler(user);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    // Stop the game here as user left or have reconnect logic
  }

  private addHandler(socket: WebSocket){
    socket.on("message", (data) => {
        // Should use grpc for this
        const message = JSON.parse(data.toString());

        // msg_event => "init_game"
        if(message.type === INIT_GAME){
            if(this.pendingUser){
                // Start the game
                const game = new Game(this.pendingUser, socket);
                this.games.push(game);
                this.pendingUser = null;
            }else{
                this.pendingUser = socket; // user waiting to be connected to someone else
            }
        }

        // msg_event => "move"
        if (message.type === MOVE) {
            const gameId = message.payload.gameId;
            const game = this.games.find((game) => game.player1UserId === socket || game.player2UserId === socket);
            if (game) {
              game.makeMove(socket, message.payload.move);
            }
        }
    });
  }

}