import { WebSocket } from 'ws';

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(user: WebSocket) {
    this.users.push(user);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    // Stop the game here as user left or have reconnect logic
  }

  private handleMessage(){

  }

}