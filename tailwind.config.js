module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Original blue-600
          600: '#2563eb' // Add explicit 600 shade
        },
        blue: {
          DEFAULT: '#2563eb',
          light: '#bfdbfe'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          800: '#1f2937',
          900: '#111827'
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        hover: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // Add dark mode and container configuration
  darkMode: 'class',
  corePlugins: {
    container: false
  }
}