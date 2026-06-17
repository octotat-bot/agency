import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

// Animated Counter - counts up when in view
const AnimatedCounter = ({
    value,
    suffix = '',
    prefix = '',
    duration = 2,
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [displayValue, setDisplayValue] = useState(0);

    // Parse the target value (handle strings like "99%" or "$5K")
    const numericValue = parseInt(value.toString().replace(/[^0-9]/g, ''), 10) || 0;

    // Spring animation for smooth counting
    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0,
    });

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                springValue.set(numericValue);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, numericValue, springValue, delay]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {prefix}{displayValue}{suffix}
        </motion.span>
    );
};

// Progress Bar that animates on scroll
export const AnimatedProgressBar = ({
    value,
    label,
    color = 'var(--color-burgundy, #8b2942)',
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <div className="progress-bar" ref={ref}>
            <div className="progress-bar__header">
                <span className="progress-bar__label">{label}</span>
                <span className="progress-bar__value">
                    <AnimatedCounter value={value} suffix="%" delay={delay} />
                </span>
            </div>
            <div className="progress-bar__track">
                <motion.div
                    className="progress-bar__fill"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${value}%` } : {}}
                    transition={{
                        duration: 1.5,
                        delay: delay,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                />
            </div>
        </div>
    );
};

// Circular Progress
export const CircularProgress = ({
    value,
    size = 120,
    strokeWidth = 8,
    color = 'var(--color-burgundy, #8b2942)',
    label,
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="circular-progress" ref={ref} style={{ width: size, height: size }}>
            <svg width={size} height={size}>
                {/* Background circle */}
                <circle
                    className="circular-progress__bg"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                />
                {/* Progress circle */}
                <motion.circle
                    className="circular-progress__fill"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    stroke={color}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={isInView ? { strokeDashoffset: offset } : {}}
                    transition={{
                        duration: 1.5,
                        delay,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{
                        transformOrigin: 'center',
                        transform: 'rotate(-90deg)',
                    }}
                />
            </svg>
            <div className="circular-progress__content">
                <span className="circular-progress__value">
                    <AnimatedCounter value={value} suffix="%" delay={delay} />
                </span>
                {label && <span className="circular-progress__label">{label}</span>}
            </div>
        </div>
    );
};

export default AnimatedCounter;
