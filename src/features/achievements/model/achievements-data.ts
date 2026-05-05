import d1 from '../assets/d1.jpg';
import d2 from '../assets/d2.jpg';
import d3 from '../assets/d3.jpg';
import d4 from '../assets/d4.jpg';
import d5 from '../assets/d5.jpg';
import d6 from '../assets/d6.jpg';
import d7 from '../assets/d7.jpg';

export const ACHIEVEMENT_IMAGES = [d1, d2, d3, d4, d5, d6, d7] as const;

export const ACHIEVEMENT_ROWS = [
  [d1, d2, d3, d4, d5],
  [d6, d7],
] as const;

export const MOBILE_ACHIEVEMENT_ROWS = [
  [d1, d2],
  [d3, d4, d5],
  [d6, d7],
] as const;
