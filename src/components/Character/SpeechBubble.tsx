import { motion } from 'framer-motion';

interface SpeechBubbleProps {
    text: string;
}

export function SpeechBubble({ text }: SpeechBubbleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-[250px] md:max-w-[300px] bg-white text-gray-900 rounded-2xl rounded-br-sm px-4 py-3 shadow-lg text-sm md:text-base mb-2 mr-4 md:mr-0 self-end md:self-auto"
        >
            <p>{text}</p>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45 hidden md:block" />
        </motion.div>
    );
}
