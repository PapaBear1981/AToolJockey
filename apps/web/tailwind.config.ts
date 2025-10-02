import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1f6feb',
          500: '#1f6feb',
          600: '#1a5cd3',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
