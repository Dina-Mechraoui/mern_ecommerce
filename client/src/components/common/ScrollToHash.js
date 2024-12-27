import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

const ScrollToHash = () => {
    const location = useLocation();
  
    useEffect(() => {
      if (location.hash === '#contact-us') {
        const element = document.getElementById('contact-us');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, [location]);
  
    return null;
  };

export default ScrollToHash