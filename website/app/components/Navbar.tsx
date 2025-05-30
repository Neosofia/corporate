import { useEffect } from "react";
import { useState } from "react";

import logo from '../../app/assets/Neosofia.png';
import { LoadingScreen } from "./LoadingScreen";

export const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
      <div className={`bg-slate-900 text-gray-100`}></div>

      <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-2">
          <div className="flex justify-between items-center h-8 md:h-14">
            <div>
              <a href="/#" className="">
                <img src={logo} alt="logo" className="mx-auto h-4 md:h-8 md:min-w-[204px]" />
              </a>
            </div>

            { /* Mobile Hamburger Menu */}
            <div className={`h-6 relative cursor-pointer z-40 md:hidden ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`} onClick={() => setMenuOpen((prev) => !prev)}>
              &#9776;
            </div>

            { /* Default Menu */}
            <MenuItems menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

            { /* Mobile Menu */}
            <div
              className={`fixed top-0 left-0 w-full bg-[rgba(20,20,20,0.7)] z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none"}`}
            >
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="absolute top-0 right-2 text-white text-2xl focus:outline-none cursor-pointer"
                aria-label="Close Menu"
              >
                &times;
              </button>

              <MenuItems mobile={true} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};


interface MenuItemsProps {
  mobile?: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItems = ({ mobile = false, menuOpen, setMenuOpen }: MenuItemsProps) => {

  const menu = [
    { name: "Home", link: "/" },
    { name: "Resources", link: "/resources/" },
    { name: "Blog", link: "/blog/" },
  ]

  if (mobile) {
    return (
      <div className="flex flex-col items-center space-y-4">
        {menu.map((item, index) => (
          <a
            href={item.link}
            key={item.name}
            onClick={() => setMenuOpen(false)}
            className={`text-xl font-semibold text-white my-4 transform transition-transform duration-300
      ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            {item.name}
          </a>

        ))
        }
      </div>
    )
  }
  else {
    return (
      <div className="hidden md:flex items-center space-x-8">
        {menu.map((item, index) => (
          <a href={item.link} key={item.name} className="text-gray-300 hover:text-white transition-colors">{item.name}</a>
        ))}
      </div>
    )
  }
}
