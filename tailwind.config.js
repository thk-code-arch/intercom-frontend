module.exports = {
  important: true,
  theme: {
    fontFamily: {
      display: ['din-2014'],
      body: ['din-2014'],
    },
    extend: {
      colors: {
        'codearch': {
          50: '#F2FBFF',
          100: '#E6F7FF',
          200: '#BFECFF',
          300: '#99E0FF',
          400: '#4DC8FF',
          500: '#00B1FF',
          600: '#009FE6',
          700: '#006A99',
          800: '#005073',
          900: '#00354D'
            },
      },
      margin: {
        '96': '24rem',
        '128': '32rem',
      },
      zIndex: {
         '60': '60',
        }
    },
    container: {
        center: true,
      screens: {
         sm: "100%",
         md: "100%",
         lg: "1024px",
         xl: "1280px"
      }
    }

  },
  variants: {
    opacity: ['responsive', 'hover']
  }
}
