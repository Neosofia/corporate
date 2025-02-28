import { useState } from "react";

import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";

import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
      <div
        className={`min-h-screen ${isLoaded ? "opacity-100" : "opacity-0"
          } bg-slate-900 text-gray-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        <Home />
        <About />
        <Contact />

      </div>
    </>
  );
}

export default App;
