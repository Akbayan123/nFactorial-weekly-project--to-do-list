import { useState, useEffect } from "react";
import Header from './components/header/index';
import Footer from './components/footer/index';
import List from './components/list/index';
import './App.css';

function App() {
  return (
    <div className='app'>      
        <Header/>
        <List/>
        <Footer/>
    </div>
  );
}

export default App;
