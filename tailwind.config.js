/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Ground Tech Brand Colors
        brand: {
          navy: '#0E3A5D',      // Primary Navy Blue
          blue: '#1F6FA8',      // Secondary Tech Blue
          gold: '#F2C94C',      // Accent/CTA Gold
          earth: '#8A5A2B',     // Ground/Earth Accent
          light: '#F7F9FB',     // Background Light
          dark: '#2C2C2C',      // Text Dark
        },
        primary: {
          DEFAULT: '#0E3A5D',   // Navy Blue
          dark: '#0A2E4A',      // Darker Navy
          light: '#1F6FA8',     // Tech Blue
        },
        accent: {
          DEFAULT: '#F2C94C',   // Gold
          dark: '#D4A832',      // Darker Gold for hover
          light: '#F5D76E',     // Lighter Gold
        },
        dark: {
          DEFAULT: '#0E3A5D',
          lighter: '#1F6FA8',
        }
      },
      fontSize: {
        'hero': ['60px', { lineHeight: '1.2', fontWeight: '700' }],
        'title': ['42px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
}
