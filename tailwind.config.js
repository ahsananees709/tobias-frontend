/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
        fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['Fira Code', 'Courier', 'monospace'],
      },
      boxShadow: {
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.2)',
        '4xl': '0 20px 40px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'btn-color': '#D0B8A8',
        'btn-color-hover': '#C5705D',
        'btn-text-color': '#000000',
        'btn-text-color-hover': '#FFFFFF',
        'form-color': '#DFD3C3',
        'footer-header-color': '#C5705D',
        'nav-item-color-hover': '#DFD3C3',
        'nav-item-color-active': '#F8EDE3',
        'nav-item-text-color': '#FFFFFF',
        'nav-item-text-color-hover': '#000000',
      },
    },
  },
  plugins: [],
}

