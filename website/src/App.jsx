import React from 'react';
import logo from './assets/Neosofia.png';

function App() {

  return (
    <header className="flex bg-white shadow-md h-6 sm:h-10">
      <nav className="flex nowrap">
        <div className="p-1">
          <a href="/#" className=""><img src={logo} alt="logo" className="mx-auto h-4 sm:h-8 sm:min-w-[204px]" /></a>
        </div>

        <div className="p-0 w-4 sm:w-16"></div>

        <div className="text-left text-red-800 flex *:pr-1 *:sm:p-2">
          <div>
            <a href="/#" className="text-xs sm:text-xl">Product</a>
          </div>
          <div>
            <a href="/#" className="text-xs sm:text-xl">Blog</a>
          </div>
          <div>
            <a href="/#" className="text-xs sm:text-xl">About</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default App;
