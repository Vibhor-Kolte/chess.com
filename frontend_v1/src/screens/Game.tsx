import { useEffect } from "react";
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket";

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

export const Game = () => {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            switch (message.type) {
                case INIT_GAME:
                    console.log('Game initialized');
                    break;
                case MOVE:
                    console.log('Move made');
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
                    <div className='flex justify-center'>
                        <ChessBoard/>
                    </div>
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
}