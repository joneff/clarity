import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { bundleSizePlugin } from 'web-test-runner-performance';
import { fromRollup } from '@web/dev-server-rollup';
import alias from '@rollup/plugin-alias';
import baseConfig from './web-test-runner.config.mjs';

const rollupAlias = fromRollup(alias);

const entries = [
  { find: /^@cds\/core\/([^.]+)$/, replacement: `${process.cwd()}/dist/core/$1/index.js` },
  { find: /^@cds\/core\/(.+)\.js$/, replacement: `${process.cwd()}/dist/core/$1.js` },
  { find: /^@cds\/core\/(.+)\.css$/, replacement: `${process.cwd()}/dist/core/$1.css` },
  { find: /^(.*)\.ts$/, replacement: `${process.cwd()}/$1.js` },
  { find: '.js', replacement: `.ts` },
];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  ...baseConfig,
  concurrency: 1,
  concurrentBrowsers: 1,
  files: ['./src/**/index.performance.ts'],
  browsers: [playwrightLauncher({ product: 'chromium', launchOptions: { headless: false } })],
  plugins: [
    rollupAlias({ entries }),
    esbuildPlugin({ ts: true, json: true, target: 'auto' }),
    bundleSizePlugin({
      external: [/^tslib/, /^ramda/, /^@lit/, /^lit/, /^lit-html/, /^lit-element/],
      aliases: { entries },
    }),
  ],
});
