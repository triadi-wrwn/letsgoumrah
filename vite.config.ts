import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const defaultConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isDev = mode === 'development';
    console.log('dev', isDev);
    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: 'http://139.59.235.36:8000',
            changeOrigin: isDev,
            secure: !isDev
          }
        }
      }
    };
  }
  return defaultConfig;
});
