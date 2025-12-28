import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";
import { ArrowUp } from "lucide-react";
import CourseDetailPageHome from "./pages/CourseDetailPageHome";
import CourseDetailPage from "./pages/CourseDetailPage";

// route protection

const ProtectRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return Boolean(token);
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// scroll to to
const ScrollToTopOnChangeRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // remove if you want instant
    });
  }, [pathname]);

  return null;
};

const ScrollToTopButton = ({ threshold } = 200, showOnMount = false) => {
  const [visible, setVisible] = useState(!!showOnMount);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={
        "fixed bottom-6 right-6 z-50 p-2 rounded-full " +
        "focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 " +
        "backdrop-blur-sm border border-white/20 shadow-lg cursor-pointer transition-transform"
      }
    >
      <ArrowUp size={20} className="w-6 h-6 text-sky-700 drop-shadow-sm" />
    </button>
  );
};

const App = () => {
  return (
    <>
      <ScrollToTopOnChangeRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/courses" element={<Courses />} />

        <Route
          path="/courses/:id"
          element={
            <ProtectRoute>
              <CourseDetailPageHome />
            </ProtectRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectRoute>
              <CourseDetailPage />
            </ProtectRoute>
          }
        />
      </Routes>

      <ScrollToTopButton threshold={250} />
    </>
  );
};

export default App;
