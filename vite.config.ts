import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@api': path.resolve(__dirname, './src/api'),
			'@components': path.resolve(__dirname, './src/components'),
			'@services': path.resolve(__dirname, './src/utils'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
	},
	server: {
		open: true,
	},
});
