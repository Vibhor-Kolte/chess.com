import { Square, PieceSymbol, Color, Chess } from 'chess.js';
import { useState } from 'react';
import { MOVE } from '../screens/Game';

export const ChessBoard = ({board, setBoard, chess, socket}:{
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]

    setBoard: any;

    chess: Chess;

    socket: WebSocket | null;
}) => {

    const [from, setFrom] = useState<Square | null>(null);
    //const [to, setTo] = useState<Square | null>(null);

    return <div className='text-white-200'>
        {board.map((row, i) => {
            return <div key={i} className='flex'>
                {row.map((square, j) => {
                    const squareRepresentation = String.fromCharCode(97 + j) + (8 - i) as Square;

                    return <div key={j} 
                        className={`
                            w-16 h-16
                            ${i % 2 === 0 ? 
                                j % 2 === 0 ? 'bg-stone-400' : 'bg-stone-200' : 
                                j % 2 === 0 ? 'bg-stone-200' : 'bg-stone-400'}
                        `}

                        onClick={() => {
                            if (!from) {
                                setFrom(squareRepresentation);
                            } else {
                                //setTo(squareRepresentation);
                                if (socket) {
                                    socket.send(JSON.stringify({
                                        type: MOVE,
                                        payload: {
                                            move: {
                                                from,
                                                to: squareRepresentation
                                            }
                                        }
                                    }));
                                }
                                setFrom(null); 
                                chess.move({
                                    from,
                                    to: squareRepresentation
                                });
                                setBoard(chess.board());                           
                                console.log(from, squareRepresentation);
                            }
                        }}
                        
                        >
                        <div className='w-full h-full flex justify-center items-center'>
                        {square ? square.type: ''}
                        {/* {square ? 
                            <img 
                                src={`/pieces/${square?.color === 'b' ? square?.type : `${square?.type?.toUpperCase} copy`}.png`} 
                                className='w-4'
                            /> 
                            : null
                        } */}
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}