import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    const scramble = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <span
            className={className}
            onMouseEnter={scramble}
            style={{ display: 'inline-block', minWidth: '1em' }} // Prevent layout shift
        >
            {displayText}
        </span>
    );
};

export default GlitchText;
