import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';

function App() {
  return (
    <>
      <BrowserRouter basename='/app/v1'>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/game' element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
