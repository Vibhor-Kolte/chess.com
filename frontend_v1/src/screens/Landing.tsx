import chessBoard from '../assets/chess-board.png';

export const Landing = () => {
  return (
    <div>
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <img src={chessBoard} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">Play Chess Online on #2 Site!</h1>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play Now</button>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}