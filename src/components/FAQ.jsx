import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const faqs = [
    {
        id: 1,
        question: 'What is your typical project timeline?',
        answer: 'Project timelines vary based on complexity. A simple portfolio or landing page typically takes 1-2 weeks, while larger business websites or web applications can take 4-8 weeks. We always provide a detailed timeline before starting any project.'
    },
    {
        id: 2,
        question: 'What is included in your web design packages?',
        answer: 'Our packages include custom design, responsive development, SEO optimization, performance optimization, and basic analytics setup. We also provide training on how to manage your content and offer ongoing support options.'
    },
    {
        id: 3,
        question: 'Do you offer revisions during the design process?',
        answer: 'Absolutely! We believe in collaborative design. Each project includes multiple revision rounds - typically 2-3 major revisions for the design phase. We work closely with you to ensure the final product exceeds your expectations.'
    },
    {
        id: 4,
        question: 'What technologies do you specialize in?',
        answer: 'We specialize in modern web technologies including React, Next.js, and Vue.js for frontend development. For styling, we use CSS-in-JS, Tailwind, or custom CSS depending on project needs. We also work with Node.js for backend services.'
    },
    {
        id: 5,
        question: 'Do you provide hosting and maintenance?',
        answer: 'Yes! We can help set up hosting on platforms like Vercel, Netlify, or AWS. We also offer monthly maintenance packages that include security updates, performance monitoring, content updates, and priority support.'
    },
    {
        id: 6,
        question: 'What is your payment structure?',
        answer: 'We typically require 50% upfront to begin work, with the remaining 50% due upon project completion. For larger projects, we can arrange milestone-based payments. We accept bank transfers, credit cards, and PayPal.'
    }
];

const FAQItem = ({ faq, isOpen, onClick, index, isInView }) => {
    return (
        <motion.div
            className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
            {/* Card Glow Effect */}
            <motion.div
                className="faq__glow"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <motion.button
                className="faq__question"
                onClick={onClick}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                data-cursor="pointer"
            >
                <span className="faq__number">0{index + 1}</span>
                <span className="faq__question-text">{faq.question}</span>

                <motion.div
                    className="faq__icon"
                    animate={{
                        rotate: isOpen ? 180 : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="faq__answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <motion.div
                            className="faq__answer-content"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            <p>{faq.answer}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [openId, setOpenId] = useState(1);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="faq section" ref={sectionRef}>
            {/* Background */}
            <div className="faq__bg">
                <div className="faq__bg-grid" />
                <motion.div
                    className="faq__bg-gradient"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
            </div>

            <div className="container">
                {/* Header */}
                <motion.div
                    className="faq__header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="faq__header-left">
                        <motion.span
                            className="section-label"
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            FAQ
                        </motion.span>
                        <h2 className="heading-lg">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                style={{ display: 'block' }}
                            >
                                Questions? <span className="text-serif">Answers.</span>
                            </motion.span>
                        </h2>
                    </div>

                    <motion.p
                        className="faq__header-text"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Everything you need to know before we start building something amazing together.
                    </motion.p>
                </motion.div>

                {/* FAQ Grid */}
                <div className="faq__grid">
                    <div className="faq__list">
                        {faqs.slice(0, 3).map((faq, index) => (
                            <FAQItem
                                key={faq.id}
                                faq={faq}
                                index={index}
                                isOpen={openId === faq.id}
                                onClick={() => toggleFAQ(faq.id)}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                    <div className="faq__list">
                        {faqs.slice(3).map((faq, index) => (
                            <FAQItem
                                key={faq.id}
                                faq={faq}
                                index={index + 3}
                                isOpen={openId === faq.id}
                                onClick={() => toggleFAQ(faq.id)}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="faq__cta"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="faq__cta-content">
                        <h4>Still have questions?</h4>
                        <p>We're happy to help with anything else.</p>
                    </div>
                    <motion.a
                        href="#contact"
                        className="faq__cta-btn"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor="magnetic"
                    >
                        <span>Get in Touch</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
