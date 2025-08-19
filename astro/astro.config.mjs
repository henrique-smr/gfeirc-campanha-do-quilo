// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	outDir: '../public/',
	build: {
		assets: "assets",
	},

	vite: {
		plugins: [tailwindcss()],
		assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],
	},

	integrations: [

		icon({
			iconDir: 'src/assets/icons',
		}),
		react(),
	]
});
