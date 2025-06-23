/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        button: {
          DEFAULT: '#4F46E5', // 기존 blue-500
          hover: '#4338CA', // 기존 blue-600
        },
        muted: '#9CA3AF', // 기존 gray-400
        danger: {
          DEFAULT: '#F87171', // 기존 red-400
          hover: '#DC2626', // 기존 red-600
        },
        card: '#ffffff',
        border: '#E5E7EB', // gray-200
      },
    },
  },
  plugins: [],
};
