import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './CTABanner.css';

const CTABanner = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section className="cta section" ref={sectionRef}>
            <div className="cta__bg">
                <motion.div className="cta__circle cta__circle--1" style={{ y }} />
                <motion.div className="cta__circle cta__circle--2" style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} />
                <div className="cta__grid" />
            </div>

            <div className="container">
                <motion.div
                    className="cta__content"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Large Text */}
                    <motion.h2
                        className="cta__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Ready to elevate<br />
                        your <span className="text-serif">digital presence?</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        className="cta__description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Let's collaborate to create something extraordinary.
                        Your next great project starts with a conversation.
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        className="cta__actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.a
                            href="#contact"
                            className="cta__btn cta__btn--primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Start Your Project</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="mailto:hello@studio.dev"
                            className="cta__btn cta__btn--outline"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span>hello@studio.dev</span>
                        </motion.a>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        className="cta__features"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="cta__feature">
                            <div className="cta__feature-icon">✓</div>
                            <span>Free Consultation</span>
                        </div>
                        <div className="cta__feature">
                            <div className="cta__feature-icon">✓</div>
                            <span>24hr Response</span>
                        </div>
                        <div className="cta__feature">
                            <div className="cta__feature-icon">✓</div>
                            <span>Satisfaction Guaranteed</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTABanner;
