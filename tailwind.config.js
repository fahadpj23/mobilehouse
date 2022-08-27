module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#fb641b',
      
     }),
    extend: {
      
      height:{
        // sm: '8px',
        // md: '16px',
        // lg: '24px',
        // xl: '48px',
        iconheight: '42px',
        fixedNoNav3: 'calc(100vh - 0.80rem)',
        fixedNoNav: 'calc(100vh - 2.80rem)',
        fixedNoNav1: 'calc(100vh - 11.80rem)',
        fixedNoNav2: 'calc(100vh - 45.80rem)',
        fixedNoNavlg: 'calc(100vh - 4.75rem)',
        fixedNoNavlg4: 'calc(100vh - 15.75rem)',
        fixedNoNavlg5: 'calc(100vh - 5.75rem)',
        fixedNoNavlg6: 'calc(100vh - 15.55rem)',
        userprofilemain: 'calc(100vh - 4.70rem - 2rem)',
        addrGrid:'160px'
        
        
       },
       maxHeight: {
        
        fixedNoNavlgmax: 'calc(100vh - 5.75rem)',
        '128': '32rem',
        

    },
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
