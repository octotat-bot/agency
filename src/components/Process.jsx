import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Process.css';

const steps = [
    {
        number: '01',
        title: 'Discovery',
        description: 'We start by understanding your vision, goals, and target audience. Deep research ensures we build exactly what you need.',
        details: ['Requirements Analysis', 'Market Research', 'Competitive Audit', 'Strategy Planning'],
        icon: '◇'
    },
    {
        number: '02',
        title: 'Design',
        description: 'Our designers craft stunning visuals and intuitive interfaces. You\'ll see mockups and prototypes before we write a single line of code.',
        details: ['Wireframing', 'UI/UX Design', 'Prototyping', 'Design System'],
        icon: '◈'
    },
    {
        number: '03',
        title: 'Development',
        description: 'We build your project using modern technologies and best practices. Every feature is tested for performance and reliability.',
        details: ['Frontend Dev', 'Backend Integration', 'Testing & QA', 'Optimization'],
        icon: '◆'
    },
    {
        number: '04',
        title: 'Launch',
        description: 'After thorough testing, we deploy your project. We provide support and maintenance to ensure long-term success.',
        details: ['Deployment', 'Training', 'Support', 'Maintenance'],
        icon: '●'
    }
];

// Animation variants
const slideFromLeft = {
    hidden: { opacity: 0, x: -100, rotate: -5 },
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

const slideFromRight = {
    hidden: { opacity: 0, x: 100, rotate: 5 },
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
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

const Process = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [activeStep, setActiveStep] = useState(null);

    return (
        <section id="process" className="process section" ref={sectionRef}>
            {/* Background Elements */}
            <div className="process__bg">
                <div className="process__bg-grid" />

                {/* Floating Decorative Elements */}
                <motion.div
                    className="process__floating process__floating--1"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />
                <motion.div
                    className="process__floating process__floating--2"
                    animate={{
                        y: [0, 20, 0],
                        x: [0, -10, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="process__floating process__floating--3"
                    animate={{
                        rotate: [0, 360]
                    }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                />
            </div>

            <div className="container">
                {/* Header */}
                <div className="process__header">
                    <motion.div
                        className="process__header-left"
                        initial={{ opacity: 0, x: -80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <motion.span
                            className="section-label"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Our Process
                        </motion.span>
                        <h2 className="heading-lg">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                style={{ display: 'block' }}
                            >
                                How We <span className="text-serif">Work</span>
                            </motion.span>
                        </h2>

                        {/* Animated Line */}
                        <motion.div
                            className="process__header-line"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </motion.div>

                    <motion.p
                        className="process__header-text"
                        initial={{ opacity: 0, x: 80 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        A streamlined approach that delivers exceptional results on time, every time.
                        We believe in transparency and collaboration at every step.
                    </motion.p>
                </div>

                {/* Steps - Alternating Slide Animations */}
                <div className="process__steps">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            className={`process__step ${activeStep === index ? 'process__step--active' : ''}`}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -100 : 100,
                                rotate: index % 2 === 0 ? -3 : 3
                            }}
                            animate={isInView ? {
                                opacity: 1,
                                x: 0,
                                rotate: 0
                            } : {}}
                            transition={{
                                duration: 0.8,
                                delay: 0.4 + index * 0.15,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                            onMouseEnter={() => setActiveStep(index)}
                            onMouseLeave={() => setActiveStep(null)}
                        >
                            <div className="process__step-header">
                                <motion.div
                                    className="process__step-number"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="process__step-number-text">{step.number}</span>
                                    <motion.div
                                        className="process__step-number-ring"
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                                    />
                                </motion.div>
                                <div className="process__step-line">
                                    <motion.div
                                        className="process__step-line-fill"
                                        initial={{ scaleX: 0 }}
                                        animate={isInView ? { scaleX: 1 } : {}}
                                        transition={{ duration: 1.2, delay: 0.7 + index * 0.2 }}
                                    />

                                    {/* Animated Dot */}
                                    <motion.div
                                        className="process__step-line-dot"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 1.5 + index * 0.2, duration: 0.3 }}
                                    />
                                </div>
                            </div>

                            <motion.div
                                className="process__step-content"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                            >
                                <div className="process__step-icon-wrapper">
                                    <motion.span
                                        className="process__step-icon"
                                        animate={activeStep === index ? {
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 10, -10, 0]
                                        } : {}}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {step.icon}
                                    </motion.span>
                                </div>

                                <h3 className="process__step-title">{step.title}</h3>
                                <p className="process__step-description">{step.description}</p>

                                <motion.ul
                                    className="process__step-details"
                                    initial="hidden"
                                    animate={activeStep === index ? "visible" : "hidden"}
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.08
                                            }
                                        }
                                    }}
                                >
                                    {step.details.map((detail, i) => (
                                        <motion.li
                                            key={i}
                                            variants={{
                                                hidden: { opacity: 0, x: -20 },
                                                visible: { opacity: 1, x: 0 }
                                            }}
                                        >
                                            <span className="process__step-detail-dot">→</span>
                                            {detail}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>

                            {/* Card Glow Effect */}
                            <motion.div
                                className="process__step-glow"
                                animate={{ opacity: activeStep === index ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Connecting Line */}
                <motion.div
                    className="process__connector"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 1.5, delay: 0.5 }}
                />

                {/* Bottom CTA */}
                <motion.div
                    className="process__cta"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className="process__cta-content">
                        <motion.h3
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 1.1, duration: 0.6 }}
                        >
                            Ready to start your project?
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 1.2, duration: 0.6 }}
                        >
                            Let's discuss how we can help bring your vision to life.
                        </motion.p>
                    </div>
                    <motion.a
                        href="#contact"
                        className="process__cta-btn"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.3, duration: 0.6 }}
                    >
                        <span>Get Started</span>
                        <motion.svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </motion.svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Process;
