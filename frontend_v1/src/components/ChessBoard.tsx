import { Square, PieceSymbol, Color } from 'chess.js';
import { useState } from 'react';
import { MOVE } from '../screens/Game';

export const ChessBoard = ({board, socket}:{
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]

    socket: WebSocket | null;
}) => {

    const [from, setFrom] = useState<Square | null>(null);
    const [to, setTo] = useState<Square | null>(null);

    return <div className='text-white-200'>
        {board.map((row, i) => {
            return <div key={i} className='flex'>
                {row.map((square, j) => {
                    return <div key={j} 
                        className={`
                            w-16 h-16
                            ${i % 2 === 0 ? 
                                j % 2 === 0 ? 'bg-stone-400' : 'bg-stone-200' : 
                                j % 2 === 0 ? 'bg-stone-200' : 'bg-stone-400'}
                        `}

                        onClick={() => {
                            if (!from) {
                                setFrom(square?.square ?? null);
                            } else {
                                setTo(square?.square || null);
                                if (socket) {
                                    socket.send(JSON.stringify({
                                        type: MOVE,
                                        move: {
                                            from,
                                            to
                                        }
                                    }));
                                }
                            }
                        }}
                        
                        >
                        <div className='w-full h-full flex justify-center items-center'>
                        {square ? square.type: ''}
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}