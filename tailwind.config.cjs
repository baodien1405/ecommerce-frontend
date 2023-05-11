/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    } else {
      return `rgb(var(${variableName}))`
    }
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d',
        light: withOpacity('--color-light'),
        dark: withOpacity('--color-dark'),
        accent: withOpacity('--color-accent')
      },
      textColor: {
        body: withOpacity('--text-base'),
        heading: withOpacity('--text-heading'),
        'muted-light': withOpacity('--text-muted-light')
      },
      boxShadow: {
        base: 'rgba(0, 0, 0, 0.16) 0px 4px 16px'
      },
      accentColor: {
        green: withOpacity('--color-accent')
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
      addComponents({
        '.header-height': {
          height: '58px'
        }
      })
    }),
    require('@tailwindcss/line-clamp'),
    require('@headlessui/tailwindcss')
  ]
}
