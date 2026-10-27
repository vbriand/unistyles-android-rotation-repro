import { StyleSheet } from 'react-native-unistyles';

const theme = {
  colors: {
    background: '#111',
    card: '#3a6ea5',
    header: '#222',
    tabBar: '#333',
    text: '#fff',
  },
  spacing: 16,
};

type AppThemes = { dark: typeof theme };

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  settings: { initialTheme: 'dark' },
  themes: { dark: theme },
});
