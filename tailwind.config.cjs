/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'site-black': 'rgb(var(--black) / <alpha-value>)',
        'site-gray': 'rgb(var(--gray) / <alpha-value>)',
        'gray-light': 'rgb(var(--gray-light) / <alpha-value>)',
        'gray-dark': 'rgb(var(--gray-dark) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Atkinson', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT: 'var(--box-shadow)',
      },
      backgroundImage: {
         'gray-gradient': "linear-gradient(to bottom, theme('colors.gray-light'), white)",
      }
    },
  },
  plugins: [],
} 
