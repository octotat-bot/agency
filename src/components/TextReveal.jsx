import { motion } from 'framer-motion';

const defaultContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
};

const defaultChild = {
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
        rotate: 5,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

export const TextReveal = ({ text, className = '', delay = 0 }) => {
    const letters = text.split("");

    return (
        <motion.span
            style={{ display: "inline-block", overflow: "hidden", whiteSpace: "nowrap" }}
            variants={defaultContainer}
            initial="hidden"
            animate="visible"
            custom={delay}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={defaultChild}
                    key={index}
                    style={{ display: "inline-block" }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
};

export const WordReveal = ({ text, className = '', delay = 0 }) => {
    const words = text.split(" ");

    return (
        <motion.span
            style={{ display: "inline-block", overflow: "hidden" }}
            variants={defaultContainer}
            initial="hidden"
            animate="visible"
            custom={delay}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={defaultChild}
                    key={index}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};
