import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {         
          "primary": "#7289da",
                    
          "secondary": "#65c767",
                    
          "accent": "#1fb2a6",
                    
          "neutral": "#1c1917",
                    
          "base-100": "#292929",
                    
          "info": "#3abff8",
                    
          "success": "#36d399",
                    
          "warning": "#fbbd23",
                    
          "error": "#f87272",
        }
      },
      "light", 
      "dark"
    ],
  },

} satisfies Config