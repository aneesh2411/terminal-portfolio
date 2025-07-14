/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
      },
      colors: {
        'terminal-green': '#00ff00',
        'terminal-dark-green': '#00cc00',
        'terminal-bg': '#000000',
        'terminal-cursor': '#00ff00',
      },
      animation: {
        'blink': 'blink 1s infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
} 