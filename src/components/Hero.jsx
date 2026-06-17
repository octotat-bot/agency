import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero3D from './Hero3D';
import { WordReveal } from './TextReveal';
import AnimatedCounter from './AnimatedCounter';
import './Hero.css';

const Hero = () => {
    const sectionRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="hero" id="main-content" role="main">
            {/* 3D Background */}
            <div className="hero__bg">
                <Hero3D />
                <div className="hero__grid" />
                <motion.div
                    className="hero__gradient"
                    style={{ x: mousePosition.x, y: mousePosition.y }}
                />
            </div>

            {/* Main Content */}
            <motion.div
                className="hero__content"
                style={{ opacity, y }}
            >
                <div className="hero__container">
                    {/* Label */}
                    <motion.div
                        className="hero__label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="hero__label-dot" />
                        <span>BrixtinStudioX — Design & Engineering</span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="hero__headline">
                        <div className="hero__headline-row">
                            <WordReveal
                                text="We craft"
                                className="hero__headline-text"
                                delay={0.2}
                            />
                        </div>
                        <div className="hero__headline-row">
                            <span className="hero__headline-text hero__headline-text--serif">
                                <WordReveal
                                    text="digital"
                                    delay={0.4}
                                />
                            </span>
                            <WordReveal
                                text="experiences"
                                className="hero__headline-text"
                                delay={0.6}
                            />
                        </div>
                        <div className="hero__headline-row">
                            <WordReveal
                                text="that"
                                className="hero__headline-text"
                                delay={0.8}
                            />
                            <span className="hero__headline-text hero__headline-text--outline">
                                <WordReveal
                                    text="convert"
                                    delay={1}
                                />
                            </span>
                        </div>
                    </div>

                    {/* Description & CTA */}
                    <motion.div
                        className="hero__bottom"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        <p className="hero__description">
                            We design and develop stunning websites that help
                            businesses grow. From concept to launch, we bring
                            your vision to life.
                        </p>

                        <div className="hero__cta-group">
                            <motion.button
                                className="hero__cta hero__cta--primary"
                                onClick={() => scrollToSection('#contact')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                data-cursor="magnetic"
                            >
                                <span>Start a Project</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </motion.button>

                            <motion.button
                                className="hero__cta hero__cta--secondary"
                                onClick={() => scrollToSection('#work')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                data-cursor="pointer"
                            >
                                <span>View Work</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Stats Strip */}
                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                    >
                        <div className="hero__stat">
                            <span className="hero__stat-number">
                                <AnimatedCounter value={50} suffix="+" duration={2} />
                            </span>
                            <span className="hero__stat-label">Projects</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number">
                                <AnimatedCounter value={30} suffix="+" duration={2} delay={0.2} />
                            </span>
                            <span className="hero__stat-label">Clients</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number">
                                <AnimatedCounter value={100} suffix="%" duration={2} delay={0.4} />
                            </span>
                            <span className="hero__stat-label">Satisfaction</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="hero__scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <motion.div
                    className="hero__scroll-line"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                <span>Scroll</span>
            </motion.div>

            {/* Side Badge */}
            <motion.div
                className="hero__badge"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <span>Available for</span>
                <span>new projects</span>
            </motion.div>
        </section>
    );
};

export default Hero;
