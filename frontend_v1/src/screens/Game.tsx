import { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket";
import { Chess} from 'chess.js';

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

export const Game = () => {
    const socket = useSocket();

    const [chess, _setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    //_setChess(new Chess());       //BUG
                    setBoard(chess.board());
                    console.log('Game initialized');
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log('Move made:- ', move);
                    break;
                case GAME_OVER:
                    console.log('Game over');
                    break;
                default:
                    console.log('Unknown message type');
            }
        }
    }, [socket]);

    if (!socket) {
        return <div className="text-white font-bold">Connecting...</div>
    }

    return <div>
        <div className='flex justify-center'>
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className='cols-span-4 flex justify-center'>
                        <ChessBoard board={board} setBoard={setBoard} chess={chess} socket={socket}/>
                    </div>
                    
                    <div className="cols-span-2 bg-stone-700 w-full flex justify-center">
                        <div className='pt-8'>
                            <div className="mt-6 flex justify-center">
                                <button 
                                    className="bg-lime-600 hover:bg-blue-600 text-white font-bold py-4 px-48 rounded"
                                    onClick={() => {
                                        socket.send(JSON.stringify({ type: INIT_GAME }));
                                    }}
                                >
                                    Play
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}