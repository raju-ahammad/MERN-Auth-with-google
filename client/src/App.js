import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './app.css'
import Body from './Components/body/Body'
import Header from './Components/header/Header'

const App = () => {
  return (
   <Router>
     <Header/>
     <Body/>
   </Router>
  )
}

export default App
