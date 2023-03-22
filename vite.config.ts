import { sveltekit } from "@sveltejs/kit/vite";
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    VitePWA({
		injectRegister: 'auto',
      registerType: "autoUpdate",
	  workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
