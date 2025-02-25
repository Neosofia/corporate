import React from 'react';
import logo from './assets/Neosofia.png';

function App() {

  return (
    <header className="flex bg-white shadow-md">
      <nav className="flex nowrap p-2">
        <div className="p-1">
          <a href="/#" className=""><img src={logo} alt="logo" className="h-8" /></a>
        </div>
        <div className="w-32"></div>

        <div className="text-left text-red-800 flex">
          <div className="p-1 pr-6">
            <a href="/#" className="text-xl">Product</a>
          </div>
          <div className="p-1 pr-6">
            <a href="/#" className="text-xl">Blog</a>
          </div>
          <div className="p-1 pr-6">
            <a href="/#" className="text-xl">About</a>
          </div>
          <div className="p-1 pr-6">
            <a href="/#" className="text-xl">Who</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default App;
