import type { Expression } from '@/types/character';

export const expressionMap: Record<Expression, string> = {
    neutral: '😐',
    tired: '😩',
    eyeroll: '🙄',
    shrug: '🤷',
    deadinside: '💀',
    excited: '😄',
    facepalm: '🤦',
    smirk: '😏',
};

export function getExpressionEmoji(expression: Expression): string {
    return expressionMap[expression] || '😐';
}
