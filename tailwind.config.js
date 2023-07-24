module.exports = {
  purge: [    
    './popup.html',
    './popup.js'],
  darkMode: false, // Opciones: 'media', 'class', false
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3B82F6',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
