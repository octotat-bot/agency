import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';

import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import FloatingElements from './components/FloatingElements';
import { ToastProvider } from './components/Toast';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';
import NoiseOverlay from './components/NoiseOverlay';
import CookieConsent from './components/CookieConsent';
import './components/PageTransition.css';

import './styles/index.css';

// Animated Routes wrapper for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ToastProvider>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <ScrollToTop />
          <ScrollProgress />
          <FloatingElements />
          <Navbar />

          <AnimatedRoutes />

          {/* Back to Top Button */}
          <BackToTop />

          {/* Noise/Grain Overlay */}
          <NoiseOverlay />

          {/* Cookie Consent Banner */}
          <CookieConsent />
        </Router>
      )}
    </ToastProvider>
  );
}

export default App;
