import { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 70, onComplete }) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let charIndex = 0;
        setDisplayText('');
        setIsComplete(false);

        const interval = setInterval(() => {
            if (charIndex < text.length) {
                setDisplayText(text.slice(0, charIndex + 1));
                charIndex++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return (
        <>
            <span>{displayText}</span>
            <span
                className="typing-cursor"
                style={{ display: isComplete ? 'none' : 'inline' }}
            >
                |
            </span>
        </>
    );
};

export default TypingEffect;
