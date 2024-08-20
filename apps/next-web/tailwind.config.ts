import type { Config } from 'tailwindcss';
import { tailwindConfig } from '@hipagesgroup/toolbox';

const config = {
  presets: [tailwindConfig],
  // https://tailwindcss.com/docs/content-configuration
  content: [
    // Local pages/components
    './app/**/*.{js,ts,jsx,tsx}',
    // Toolbox
    // https://tailwindcss.com/docs/content-configuration#working-with-third-party-libraries
    // https://tailwindcss.com/docs/content-configuration#styles-rebuild-in-an-infinite-loop
    './node_modules/@hipagesgroup/toolbox/*/*.js',
  ],
  plugins: [],
} satisfies Config;

export default config;
