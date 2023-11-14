import { defineConfig, presetUno, presetIcons } from 'unocss';

export default defineConfig({
  // https://unocss.dev/guide/presets
  presets: [presetUno(), presetIcons()],
});
