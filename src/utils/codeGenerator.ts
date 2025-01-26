import crypto from 'crypto';

export const generateCodename = (): string => {
  const prefixes = ['The', 'Operation'];
  const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Phantom'];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};

export const generateConfirmationCode = (): string => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

export const generateSuccessProbability = (): number => {
  return Math.floor(Math.random() * 50) + 50;
};