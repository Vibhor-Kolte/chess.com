import chessBoard from '../assets/chess-board.png';

export const Landing = () => {
  return (
    <div className='flex justify-center'>
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className='flex justify-center'>
            <img src={chessBoard} className='max-w-96'/>
          </div>

          <div className='pt-8'>
            <h1 className="text-4xl font-bold text-white flex justify-center">Play Chess Online on #2 Site!</h1>
            <div className="mt-6 flex justify-center">
              <button className="bg-lime-600 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded">Play Now</button>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}