import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const [counter, setCounter] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showCurtain, setShowCurtain] = useState(false);

    const brandName = "BRIXTINSTUDIOX";
    const letters = brandName.split('');

    // Generate random particles (fewer for better performance)
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 0.5
    }));

    useEffect(() => {
        // Faster counter increment
        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShowCurtain(true);
                        setTimeout(() => {
                            setIsComplete(true);
                            onComplete();
                        }, 1200); // Extended delay
                    }, 500);
                    return 100;
                }
                const increment = prev < 30 ? 3 : prev < 70 ? 4 : 5;
                return Math.min(prev + increment, 100);
            });
        }, 35); // Slightly slower tick (was 25, 40ms * 100/4 steps approx 1s, let's make it last longer)

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {/* Animated Background */}
                    <div className="preloader__bg">
                        <motion.div
                            className="preloader__bg-gradient"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        {/* Floating Particles */}
                        <div className="preloader__particles">
                            {particles.map((particle) => (
                                <motion.div
                                    key={particle.id}
                                    className="preloader__particle"
                                    style={{
                                        left: `${particle.x}%`,
                                        top: `${particle.y}%`,
                                        width: particle.size,
                                        height: particle.size,
                                    }}
                                    animate={{
                                        y: [-15, 15, -15],
                                        x: [-8, 8, -8],
                                        opacity: [0.3, 0.7, 0.3],
                                    }}
                                    transition={{
                                        duration: particle.duration,
                                        repeat: Infinity,
                                        delay: particle.delay,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Animated Lines */}
                        <div className="preloader__lines">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="preloader__line"
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{
                                        scaleX: [0, 1, 0],
                                        opacity: [0, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "easeInOut"
                                    }}
                                    style={{ top: `${25 + i * 25}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <motion.div
                        className="preloader__content"
                        animate={{
                            opacity: showCurtain ? 0 : 1,
                            scale: showCurtain ? 0.95 : 1
                        }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Animated Ring Behind Logo */}
                        <div className="preloader__ring-container">
                            <motion.div
                                className="preloader__ring preloader__ring--1"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="preloader__ring preloader__ring--2"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="preloader__ring preloader__ring--3"
                                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Staggered Logo Letters with Glow */}
                        <motion.div className="preloader__logo">
                            {letters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    className="preloader__letter"
                                    initial={{ y: 50, opacity: 0, rotateX: -60 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        rotateX: 0,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.04,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            className="preloader__tagline"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                        >
                            Design & Engineering
                        </motion.p>

                        {/* Progress Bar with Percentage */}
                        <div className="preloader__progress">
                            <div className="preloader__progress-track">
                                <motion.div
                                    className="preloader__progress-fill"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: counter / 100 }}
                                    transition={{ duration: 0.05, ease: "linear" }}
                                />
                                <motion.div
                                    className="preloader__progress-glow"
                                    style={{ left: `${counter}%` }}
                                />
                            </div>
                            <div className="preloader__progress-info">
                                <span className="preloader__progress-label">
                                    {counter < 100 ? 'Loading' : 'Ready'}
                                </span>
                                <motion.span
                                    className="preloader__progress-number"
                                    key={counter}
                                >
                                    {counter}%
                                </motion.span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Split Screen Curtain Reveal */}
                    <AnimatePresence>
                        {showCurtain && (
                            <>
                                <motion.div
                                    className="preloader__curtain preloader__curtain--left"
                                    initial={{ x: 0 }}
                                    animate={{ x: '-100%' }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1]
                                    }}
                                />
                                <motion.div
                                    className="preloader__curtain preloader__curtain--right"
                                    initial={{ x: 0 }}
                                    animate={{ x: '100%' }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.76, 0, 0.24, 1]
                                    }}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;

