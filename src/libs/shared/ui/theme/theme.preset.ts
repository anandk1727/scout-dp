import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const customPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        formField: {
          background: '{primary.0}',
          borderColor: '{primary.200}',
          hoverBorderColor: '{primary.300}',
          focusBorderColor: '{primary.950}',
          color: '{primary.950}',
          placeholderColor: '{primary.500}',
          borderRadius: '0.375rem',
        },
      },
      dark: {
        primary: {
          0: '#0a0a0a',
          50: '#171717',
          100: '#262626',
          200: '#404040',
          300: '#525252',
          400: '#737373',
          500: '#a3a3a3',
          600: '#d4d4d4',
          700: '#e5e5e5',
          800: '#f5f5f5',
          900: '#fafafa',
          950: '#ffffff',
        },
        formField: {
          background: '{primary.200}',
          borderColor: '{primary.400}',
          hoverBorderColor: '{primary.600}',
        },
      },
    },
  },
});
