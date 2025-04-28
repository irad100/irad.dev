/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				// These use the CSS variables defined in src/styles/global.css
				accent: "var(--accent)",
				"accent-dark": "var(--accent-dark)",
				"site-black": "rgb(var(--black) / <alpha-value>)",
				"site-gray": "rgb(var(--gray) / <alpha-value>)",
				"gray-light": "rgb(var(--gray-light) / <alpha-value>)",
				"gray-dark": "rgb(var(--gray-dark) / <alpha-value>)",
			},
			fontFamily: {
				sans: ["Atkinson", "sans-serif"],
			},
			boxShadow: {
				// Using the CSS variable defined in src/styles/global.css
				DEFAULT: "var(--box-shadow)",
			},
			backgroundImage: {
				// Using the CSS variable defined in src/styles/global.css
				"gray-gradient": "linear-gradient(var(--gray-gradient))",
			},
		},
	},
	plugins: [],
};
