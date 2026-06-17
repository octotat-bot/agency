import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    none: { x: 0, y: 0 }
};

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    once = true,
    className = '',
    scale = 1,
    rotate = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
        margin: '-50px'
    });

    const initialState = {
        opacity: 0,
        ...directions[direction],
        scale: scale !== 1 ? 0.9 : 1,
        rotate: rotate
    };

    const animateState = {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={initialState}
            animate={isInView ? animateState : initialState}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
