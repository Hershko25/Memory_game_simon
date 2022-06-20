import React from 'react';
import { Routes, Route } from 'react-router';
import GamePage from './Game_Page/GamePage';
import WelcomePage from './Welcome_Page/WelcomePage';

export default function App() {
  return (
   <Routes>
    <Route path='/' element={<WelcomePage/>}/>
    <Route path='/game-page' element={<GamePage/>}/>
   </Routes>
  )
}
