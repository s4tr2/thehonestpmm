import { motion, AnimatePresence } from 'framer-motion';
import { SpeechBubble } from './SpeechBubble';
import type { Expression } from '@/types/character';


interface CharacterProps {
    expression: Expression;
    comment: string;
    isVisible: boolean;
}

export function Character({ comment, isVisible }: CharacterProps) {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-8 md:right-8 pointer-events-none">
            <AnimatePresence mode="wait">
                {isVisible && comment && (
                    <SpeechBubble key={comment} text={comment} />
                )}
            </AnimatePresence>

            <motion.div
                className="w-20 h-20 md:w-32 md:h-32 pointer-events-auto"
                animate={{
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/10 relative bg-gray-900">
                    <img
                        src="/avatar.png"
                        alt="The Honest PMM"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>
        </div>
    );
}
