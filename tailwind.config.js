module.exports = {
  important: true,
  theme: {
    fontFamily: {
      display: ['din-2014'],
      body: ['din-2014'],
    },
    extend: {
      colors: {
        cyan: '#9cdbff',
      },
      margin: {
        '96': '24rem',
        '128': '32rem',
      },
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
