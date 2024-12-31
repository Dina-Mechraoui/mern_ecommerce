import { useLocation } from "react-router-dom";
import NavBar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToHash from "../components/common/ScrollToHash";

const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
  
    return (
      <div className="flex flex-col min-h-screen">
            
        {!isAdminRoute && <NavBar />}
        {!isAdminRoute && <ScrollToHash/>}
        <main className="flex-grow">{children}</main>
        {!isAdminRoute && <Footer />}
      </div>
    );
  };

  export default Layout;