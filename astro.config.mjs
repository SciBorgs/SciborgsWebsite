// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), react()],
  redirects: {
    "/history": `/history/${new Date().getFullYear() - 1}`
  }
});