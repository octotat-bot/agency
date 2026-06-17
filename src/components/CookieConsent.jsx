import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const hasConsented = localStorage.getItem('cookieConsent');
        if (!hasConsented) {
            // Show banner after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="cookie-banner"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="cookie-banner__content">
                        <div className="cookie-banner__text">
                            <span className="cookie-banner__icon">🍪</span>
                            <p>
                                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                            </p>
                        </div>
                        <div className="cookie-banner__actions">
                            <button onClick={handleAccept} className="cookie-banner__btn cookie-banner__btn--accept">
                                Accept
                            </button>
                            <button onClick={() => setIsVisible(false)} className="cookie-banner__btn cookie-banner__btn--decline">
                                Decline
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
