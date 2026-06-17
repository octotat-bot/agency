import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            {/* Background Effects */}
            <div className="not-found__bg">
                <div className="not-found__grid" />
                <div className="not-found__orb not-found__orb--1" />
                <div className="not-found__orb not-found__orb--2" />
            </div>

            <div className="not-found__content">
                {/* Animated 404 */}
                <motion.div
                    className="not-found__number"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span className="not-found__digit">4</span>
                    <motion.span
                        className="not-found__digit not-found__digit--middle"
                        animate={{
                            rotateY: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        0
                    </motion.span>
                    <span className="not-found__digit">4</span>
                </motion.div>

                {/* Glitch Line */}
                <motion.div
                    className="not-found__glitch-line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                />

                {/* Message */}
                <motion.h1
                    className="not-found__title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    className="not-found__message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Oops! The page you're looking for seems to have wandered off into the digital void.
                </motion.p>

                {/* Actions */}
                <motion.div
                    className="not-found__actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Link to="/" className="not-found__btn not-found__btn--primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>
                    <Link to="/#contact" className="not-found__btn not-found__btn--secondary">
                        Get in Touch
                    </Link>
                </motion.div>

                {/* Fun Floating Elements */}
                <div className="not-found__floating">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="not-found__particle"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                y: [0, -20, 0],
                                x: [0, i % 2 === 0 ? 10 : -10, 0]
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3
                            }}
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${30 + (i % 3) * 20}%`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
