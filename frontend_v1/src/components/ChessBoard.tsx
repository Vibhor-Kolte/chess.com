import { Square, PieceSymbol, Color } from 'chess.js';

export const ChessBoard = ({board}:{
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}) => {
    return <div className='text-white-200'>
        {board.map((row, i) => {
            return <div key={i} className='flex'>
                {row.map((square, j) => {
                    return <div key={j} 
                        className={`w-16 h-16
                            ${i % 2 === 0 ? 
                                j % 2 === 0 ? 'bg-stone-400' : 'bg-stone-200' : 
                                j % 2 === 0 ? 'bg-stone-200' : 'bg-stone-400'}`
                        }>
                        <div className='w-full h-full flex justify-center items-center'>
                        {square ? square.type: ''}
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}