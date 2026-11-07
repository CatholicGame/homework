/** Âm lượng tiếng động trường quay (quizSfx.js): tắt tiếng trong trường quay thì 0. */
import { isMuted } from './voice.js';
export const sfxVolume = () => (isMuted() ? 0 : 0.8);
