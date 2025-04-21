import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#0095f6',
    background: '#ffffff',
    secondaryBackground: '#fafafa',
    text: '#262626',
    textSecondary: '#8e8e8e',
    border: '#dbdbdb',
    error: '#ed4956',
    buttonText: '#262626',
    buttonTextWhite: '#ffffff',
    primaryButtonBg: '#0095f6',
    primaryButtonText: '#ffffff',
    primaryButtonHoverBg: '#1877f2',
    secondaryButtonBg: '#efefef',
    secondaryButtonHoverBg: '#dbdbdb',
    link: '#00376b',
    overlay: 'rgba(0, 0, 0, 0.6)',
    notification: '#ff3040'
  },
  fonts: {
    regular: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    logo: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)'
  },
  borderRadius: {
    xs: '3px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%'
  },
  zIndex: {
    navbar: 1000,
    modal: 1050,
    dropdown: 1060,
    tooltip: 1070
  }
};

export default theme; 