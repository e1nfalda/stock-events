module.exports = {
  theme: {
    extend: {
      colors: {
        // Algolia风格主色
        primary: {
          DEFAULT: '#2962FF',
          light: '#E3F2FD'
        },
        // 专业灰阶
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          800: '#424242',
          900: '#212121'
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        hover: '0 4px 12px rgba(0,0,0,0.1)'
      }
    }
  }
}