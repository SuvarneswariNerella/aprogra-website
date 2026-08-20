import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardData = [
  {
    id: 1,
    title: "SmartSchool ERP",
    description: "The complete OS for modern schools. From admissions to alumni, digitizing every workflow in your school.",
    color: "rgba(59, 79, 207, 0.8)"
  },
  {
    id: 2,
    title: "OmniChat",
    description: "One inbox. Every channel. Whole team. WhatsApp, Instagram, Email & SMS in one unified inbox.",
    color: "rgba(6, 182, 212, 0.8)"
  }
];

