import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		preprocessorOptions: {
			// Add any preprocessor options here if needed
		}
	},
	plugins: [sveltekit(), devtoolsJson()]
});
