import type { Config } from 'tailwindcss'
import { primeui } from 'tailwindcss-primeui'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  : {
    extend: {}
  },
  plugins: [
    primeui
  ]
}

export default config
