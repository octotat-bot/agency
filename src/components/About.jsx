import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';
import GlitchText from './GlitchText';
import './AnimatedCounter.css';
import './About.css';

const stats = [
    { number: 50, label: 'Projects Delivered', suffix: '+' },
    { number: 30, label: 'Happy Clients', suffix: '+' },
    { number: 2, label: 'Years Experience', suffix: '+' },
    { number: 100, label: 'Satisfaction Rate', suffix: '%' }
];

const team = [
    {
        name: 'Creative Vision',
        role: 'Design & Strategy',
        description: 'We transform ideas into visual masterpieces that captivate and convert.',
        icon: '01'
    },
    {
        name: 'Technical Excellence',
        role: 'Development',
        description: 'Clean code, modern frameworks, and performance-first approach.',
        icon: '02'
    },
    {
        name: 'Client-Focused',
        role: 'Partnership',
        description: 'Your success is our success. We\'re partners, not just vendors.',
        icon: '03'
    }
];

// Animation variants
const slideInLeft = {
    hidden: { opacity: 0, x: -100, rotate: -3 },
    visible: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const slideInRight = {
    hidden: { opacity: 0, x: 100, rotate: 3 },
    visible: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const slideUp = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const About = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const marqueeRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="about" className="about section" ref={sectionRef}>
            {/* Background Elements */}
            <div className="about__bg">
                <div className="about__grid-pattern" />

                {/* Floating Decorative Elements */}
                <motion.div
                    className="about__floating about__floating--1"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
                <motion.div
                    className="about__floating about__floating--2"
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />
                <motion.div
                    className="about__floating about__floating--3"
                    animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
            </div>

            {/* Marquee Text */}
            <div className="about__marquee" ref={marqueeRef}>
                <motion.div className="about__marquee-track" style={{ x: marqueeX }}>
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="about__marquee-text">
                            CREATIVE STUDIO • DIGITAL AGENCY • WEB DESIGN • DEVELOPMENT •
                        </span>
                    ))}
                </motion.div>
            </div>

            <div className="container">
                {/* Main Content */}
                <motion.div
                    className="about__content"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div
                        className="about__intro"
                        variants={slideInLeft}
                    >
                        <motion.span
                            className="section-label"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            About Us
                        </motion.span>
                        <h2 className="about__title">
                            <motion.span
                                className="about__title-line"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                We're a team of <span className="text-serif">passionate</span>
                            </motion.span>
                            <motion.span
                                className="about__title-line"
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <GlitchText text="digital creators" />
                            </motion.span>
                        </h2>

                        {/* Animated Line */}
                        <motion.div
                            className="about__intro-line"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1, delay: 0.6 }}
                        />
                    </motion.div>

                    <motion.div
                        className="about__text"
                        variants={slideInRight}
                    >
                        <motion.p
                            className="about__description"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            We're two freelance developers who believe that great design and flawless
                            functionality go hand in hand. We started this studio with a simple mission:
                            to help businesses and individuals stand out in the digital world.
                        </motion.p>
                        <motion.p
                            className="about__description"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Whether you're a student looking for an impressive portfolio, a local
                            business wanting to expand online, or a startup needing a polished SaaS
                            interface — we've got you covered.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Stats - Slide in from bottom with stagger */}
                <motion.div
                    className="about__stats"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="about__stat"
                            variants={slideUp}
                            custom={index}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <motion.span
                                className="about__stat-number"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.6 + index * 0.1,
                                    type: 'spring',
                                    stiffness: 200
                                }}
                            >
                                <AnimatedCounter
                                    value={stat.number}
                                    suffix={stat.suffix}
                                    delay={0.3 + index * 0.1}
                                />
                            </motion.span>
                            <motion.span
                                className="about__stat-label"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                            >
                                {stat.label}
                            </motion.span>

                            {/* Decorative Line */}
                            <motion.div
                                className="about__stat-line"
                                initial={{ scaleY: 0 }}
                                animate={isInView ? { scaleY: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values - Alternating slide directions */}
                <div className="about__values">
                    <motion.h3
                        className="about__values-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        What Sets Us Apart
                    </motion.h3>

                    <div className="about__values-grid">
                        {team.map((item, index) => (
                            <motion.div
                                key={index}
                                className="about__value"
                                initial={{
                                    opacity: 0,
                                    x: index % 2 === 0 ? -80 : 80,
                                    rotate: index % 2 === 0 ? -5 : 5
                                }}
                                animate={isInView ? {
                                    opacity: 1,
                                    x: 0,
                                    rotate: 0
                                } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.9 + index * 0.15,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                whileHover={{
                                    y: -15,
                                    boxShadow: '0 30px 60px rgba(139, 41, 66, 0.2)',
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <motion.div
                                    className="about__value-icon"
                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {item.icon}
                                </motion.div>
                                <div className="about__value-content">
                                    <motion.span
                                        className="about__value-role"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 1 + index * 0.1 }}
                                    >
                                        {item.role}
                                    </motion.span>
                                    <h4 className="about__value-name">{item.name}</h4>
                                    <p className="about__value-description">{item.description}</p>
                                </div>
                                <motion.div
                                    className="about__value-number"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 0.3, x: 0 } : {}}
                                    transition={{ delay: 1.1 + index * 0.1 }}
                                >
                                    0{index + 1}
                                </motion.div>

                                {/* Card Glow */}
                                <div className="about__value-glow" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    className="about__cta"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <motion.a
                        href="#contact"
                        className="about__cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: -5 }}
                        >
                            Work With Us
                        </motion.span>
                        <motion.svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </motion.svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
