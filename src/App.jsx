import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePaste from './components/CreatePaste/CreatePaste';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewPaste from './components/ViewPaste/ViewPaste';


function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<CreatePaste />} />
            <Route path="/p/:id" element={<ViewPaste />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
