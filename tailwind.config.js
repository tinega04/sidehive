/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'scale-up': {
          '0%': {
            transform: 'scale(0.1)',
            opacity: '0',
            borderRadius: '9999px'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
            borderRadius: '0.5rem'
          }
        }
      },
      animation: {
        'scale-up': 'scale-up 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
} 