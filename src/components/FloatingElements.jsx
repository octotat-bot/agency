import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

// Lightweight floating shapes - reduced for performance
const FloatingElements = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Delay rendering until after initial page load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // Wait 1 second after mount

        return () => clearTimeout(timer);
    }, []);

    // Don't render on mobile for better performance
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile || !isVisible) return null;

    return (
        <div className="floating-elements">
            {/* Just 3 simple gradient orbs - CSS animated for better performance */}
            <div className="floating-orb floating-orb--1" />
            <div className="floating-orb floating-orb--2" />
            <div className="floating-orb floating-orb--3" />
        </div>
    );
};

export default FloatingElements;
