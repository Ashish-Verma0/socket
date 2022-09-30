import React from 'react'
import {Routes,Route} from "react-router-dom"
import Chat from './components/chat/Chat'
import Join from './components/Join/Join'

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Join/>}/>
      <Route exact path="/chat" element={<Chat/>}/>
    </Routes>
  )
}

export default App