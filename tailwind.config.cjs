module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        strawberry: '#FF8FAB',
        chocolate: '#59382B',
        mint: '#B8E6D0',
        lavender: '#DCD6F7',
        brandWhite: '#FFFFFF'
      },
      fontFamily: {
        sans: ['Poppins', 'Nunito', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 10px 25px rgba(89,56,43,0.08)'
      }
    }
  },
  plugins: []
}
