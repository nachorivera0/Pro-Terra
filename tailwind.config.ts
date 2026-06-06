import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pt-dark':  '#1B4D2E',
        'pt-mid':   '#2E7D3E',
        'pt-lime':  '#6BBF3C',
        'pt-gray':  '#1A1A1A',
        'pt-light': '#F5F5F5',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)',  'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
