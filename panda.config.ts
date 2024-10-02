import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: '"Noto Sans SC", "Noto Sans", sans-serif' },
          serif: { value: '"Noto Serif SC", "Noto Serif", serif' },
        },
      },
    },
  },

  jsxFramework: 'solid',

  // The output directory for your css system
  outdir: 'styled-system',
})
