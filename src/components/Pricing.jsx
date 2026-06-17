import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Pricing.css';

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for small projects and personal portfolios',
        price: 499,
        popular: false,
        features: [
            'Single Page Website',
            'Responsive Design',
            'Basic SEO Setup',
            'Contact Form',
            '2 Revisions',
            '1 Week Delivery',
            '30 Days Support'
        ],
        notIncluded: [
            'Custom Animations',
            'CMS Integration',
            'E-commerce'
        ]
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Ideal for businesses and growing brands',
        price: 1499,
        popular: true,
        features: [
            'Multi-Page Website (up to 5)',
            'Responsive Design',
            'Advanced SEO Optimization',
            'Contact Form + Integration',
            'Custom Animations',
            '5 Revisions',
            '2-3 Weeks Delivery',
            '60 Days Support',
            'Performance Optimization',
            'Analytics Setup'
        ],
        notIncluded: [
            'E-commerce Features'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'Full-featured solution for serious businesses',
        price: 3999,
        popular: false,
        features: [
            'Unlimited Pages',
            'Responsive Design',
            'Complete SEO Strategy',
            'All Integrations',
            'Custom Animations & Effects',
            'Unlimited Revisions',
            '4-6 Weeks Delivery',
            '6 Months Support',
            'CMS Integration',
            'E-commerce Ready',
            'Priority Support',
            'Source Code Ownership'
        ],
        notIncluded: []
    }
];

const addOns = [
    { name: 'Logo Design', price: 199 },
    { name: 'Brand Guidelines', price: 299 },
    { name: 'Monthly Maintenance', price: '99/mo' },
    { name: 'Content Writing (per page)', price: 79 }
];

const Pricing = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [billingCycle, setBillingCycle] = useState('one-time');

    return (
        <section id="pricing" className="pricing section" ref={sectionRef}>
            {/* Background */}
            <div className="pricing__bg">
                <div className="pricing__grid-pattern" />
                <motion.div
                    className="pricing__glow"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
            </div>

            <div className="container">
                {/* Header */}
                <motion.div
                    className="pricing__header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Pricing
                    </motion.span>
                    <h2 className="pricing__title">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Transparent <span className="text-serif">Pricing</span>
                        </motion.span>
                    </h2>
                    <motion.p
                        className="pricing__subtitle"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        Choose the perfect plan for your project. All prices are one-time payments.
                    </motion.p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="pricing__cards">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            className={`pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                        >
                            {plan.popular && (
                                <div className="pricing__badge">Most Popular</div>
                            )}

                            <div className="pricing__card-header">
                                <h3 className="pricing__plan-name">{plan.name}</h3>
                                <p className="pricing__plan-desc">{plan.description}</p>
                            </div>

                            <div className="pricing__price">
                                <span className="pricing__currency">$</span>
                                <span className="pricing__amount">{plan.price.toLocaleString()}</span>
                                <span className="pricing__period">one-time</span>
                            </div>

                            <ul className="pricing__features">
                                {plan.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        className="pricing__feature"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + i * 0.05 }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                                {plan.notIncluded.map((feature, i) => (
                                    <li key={`not-${i}`} className="pricing__feature pricing__feature--disabled">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`pricing__cta ${plan.popular ? 'pricing__cta--primary' : ''}`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </motion.a>
                        </motion.div>
                    ))}
                </div>

                {/* Add-ons Section */}
                <motion.div
                    className="pricing__addons"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <h3 className="pricing__addons-title">Optional Add-ons</h3>
                    <div className="pricing__addons-grid">
                        {addOns.map((addon, index) => (
                            <motion.div
                                key={index}
                                className="pricing__addon"
                                whileHover={{ y: -3, borderColor: 'rgba(139, 41, 66, 0.3)' }}
                            >
                                <span className="pricing__addon-name">{addon.name}</span>
                                <span className="pricing__addon-price">
                                    ${typeof addon.price === 'number' ? addon.price : addon.price}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Custom Quote CTA */}
                <motion.div
                    className="pricing__custom"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <div className="pricing__custom-content">
                        <h4>Need something custom?</h4>
                        <p>Every project is unique. Let's discuss your specific requirements and create a tailored solution.</p>
                    </div>
                    <motion.a
                        href="#contact"
                        className="pricing__custom-btn"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Custom Quote
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    className="pricing__trust"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                >
                    <div className="pricing__trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Secure Payment</span>
                    </div>
                    <div className="pricing__trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>On-Time Delivery</span>
                    </div>
                    <div className="pricing__trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                        <span>100% Satisfaction</span>
                    </div>
                    <div className="pricing__trust-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>Free Consultation</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Pricing;
