import React from 'react';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/HomePage";
import './App.css'
import Button from "./components/Button";
import RouletteWheel from './RouletteWheel';
import NavBar from './components/NavBar';


function App() {
  //   const [color, setColor] = useState("grey")
  //   const click = color => {
  //     setColor(color)
  //   }
  // useEffect(()=>{
  //   document.body.style.backgroundColor = color
  // }, [color])
  
    return (
      <>
      {/* <div className = "App">
        <button onClick = {
          () => click("yellow")
        }>Change color</button>
        <div>How to change the background color of the body</div>
      </div> */}
      {/* <Button/> */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<logIn />} />
          <Route path="/roulette" element={<RouletteWheel />} />
        </Routes>
      </Router>
      </>
    );
  }
    
  
  
  
  export default App
