import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

export const ScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (location.hash.length > 0) {
      lastHash.current = location.hash.slice(1);
    }
    console.log(document.getElementById(lastHash.current));
    if ((lastHash.current.length > 0) && (document.getElementById(lastHash.current) != null)) {
      setTimeout(() => {
        const element = document.getElementById(lastHash.current);
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - 80,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [location]);

  return null;
}
