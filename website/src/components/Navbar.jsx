import { useEffect } from "react";
import logo from '../assets/Neosofia.png';

const MenuItems = ({ mobile = false, menuOpen, setMenuOpen }) => {
  const menu = [
    { name: "Home", link: "/#home" },
    { name: "About", link: "/#about" },
    { name: "Contact", link: "/#contact" },
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

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);
  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="p-1">
            <a href="/#" className="">
              <img src={logo} alt="logo" className="mx-auto h-4 sm:h-8 sm:min-w-[204px]" />
            </a>
          </div>

          { /* Mobile Hamburger Menu */}
          <div className={`w-7 h-5 relative cursor-pointer z-40 md:hidden ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto" }`} onClick={() => setMenuOpen((prev) => !prev)}>
            &#9776;
          </div>

          { /* Default Menu */}
          <MenuItems />

          { /* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 w-full bg-[rgba(20,20,20,0.3)] z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${menuOpen ? "h-screen opacity-100 pointer-events-auto" : "h-0 opacity-0 pointer-events-none" }`}
          >
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
              aria-label="Close Menu"
            >
              &times;
            </button>

            <MenuItems mobile={true} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
};