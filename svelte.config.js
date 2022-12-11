import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = 'production' === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		adapter: adapter({
			pages: 'app',
			assets: 'app'
		}),
		paths: {
			// change below to your repo name
			base: '/Styled-Youtube-Captions' //dev ? '' : '/Styled-Youtube-Captions'
		}
	}
};

export default config;
