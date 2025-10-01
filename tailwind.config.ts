// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { primeui } from 'tailwindcss-primeui'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Georgia', 'ui-serif'],
        mono: ['Menlo', 'ui-monospace'],
      }
    }
  },
  plugins: [
    primeui
  ]
}

export default config
