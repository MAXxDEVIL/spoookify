/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0f0f23',
          secondary: '#1a1a2e',
          elevated: '#16213e',
          surface: '#0e346a',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3',
          tertiary: '#6b6b6b',
        },
        accent: {
          primary: '#4f46e5',
          hover: '#6366f1',
          active: '#4338ca',
        },
        border: '#2a2a3e',
      },
    },
  },
  plugins: [],
}
