import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import HomePage from "./pages/HomePage";
import Chatbot from "./components/Chatbot";
import { NavTransitionProvider } from "./context/NavTransitionContext";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    if (!showLanding) {
      sessionStorage.setItem('landingShown', 'true');
    }
  }, [showLanding]);

  return (
    <main
      className="relative w-full min-h-screen text-white selection:bg-red-600 selection:text-white"
      style={{ backgroundColor: '#000000' }}
    >
      <AnimatePresence mode="wait">
        {showLanding && (
          <LandingPage onEnter={() => setShowLanding(false)} />
        )}
      </AnimatePresence>

      {!showLanding && (
        <NavTransitionProvider>
          <div className="animate-fade-in relative z-10" style={{ backgroundColor: '#000000' }}>
            <Navbar />
            <HomePage onReset={() => setShowLanding(true)} />
            <Footer />
            <Chatbot />
          </div>
        </NavTransitionProvider>
      )}
    </main>
  );
};

export default App;
