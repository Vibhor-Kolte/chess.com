import { WebSocket } from 'ws';
import { INIT_GAME } from './messages';
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
    });
  }

}