export type Expression = 'neutral' | 'tired' | 'eyeroll' | 'shrug' | 'deadinside' | 'excited' | 'facepalm' | 'smirk';

export interface CharacterConfig {
    expression: Expression;
    comment: string;
}
