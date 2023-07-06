/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-color": "var(--primary-color)",
				"secondary-color": "var(--secondary-color)",
				"action-color": "var(--action-color)",
				"gray": "var(--gray)",
				"dark-gray": "var(--dark-gray)",
				"light-gray": "var(--light-gray)",
				"ternary-gray": "var(--ternary-gray)",
				"white": "var(--white)",
				"border-color": "var(--border-color)",
			},
		},
	},
	plugins: [require("daisyui")],
};

