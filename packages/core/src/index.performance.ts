/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { testBundleSize } from 'web-test-runner-performance/browser.js';

describe('bundle performance', () => {
  // it(`should meet maximum css bundle size limits`, async () => {
  //   expect((await testBundleSize(`import '@cds/core/global.min.css'`)).brotli).toBeLessThan(8);
  //   expect((await testBundleSize(`import '@cds/core/styles/module.layout.min.css'`)).brotli).toBeLessThan(4);
  //   expect((await testBundleSize(`import '@cds/core/styles/module.reset.min.css'`)).brotli).toBeLessThan(0.5);
  //   expect((await testBundleSize(`import '@cds/core/styles/module.tokens.min.css'`)).brotli).toBeLessThan(2.4);
  //   expect((await testBundleSize(`import '@cds/core/styles/module.typography.min.css'`)).brotli).toBeLessThan(1.6);
  //   expect((await testBundleSize(`import '@cds/core/styles/module.shims.min.css'`)).brotli).toBeLessThan(1.5);
  //   expect((await testBundleSize(`import '@cds/core/styles/theme.dark.min.css'`)).brotli).toBeLessThan(0.5);
  //   expect((await testBundleSize(`import '@cds/core/list/list.min.css'`)).brotli).toBeLessThan(0.5);
  // });

  it(`should bundle and treeshake all components in under 60kb`, async () => {
    const bundle = `
      import '@cds/core/accordion/register.js';
      import '@cds/core/actions/register.js';
      import '@cds/core/alert/register.js';
      import '@cds/core/badge/register.js';
      import '@cds/core/breadcrumb/register.js';
      import '@cds/core/button/register.js';
      import '@cds/core/card/register.js';
      import '@cds/core/checkbox/register.js';
      import '@cds/core/datalist/register.js';
      import '@cds/core/date/register.js';
      import '@cds/core/divider/register.js';
      import '@cds/core/file/register.js';
      import '@cds/core/forms/register.js';
      import '@cds/core/grid/register.js';
      import '@cds/core/icon/register.js';
      import '@cds/core/input/register.js';
      import '@cds/core/modal/register.js';
      import '@cds/core/navigation/register.js';
      import '@cds/core/pagination/register.js';
      import '@cds/core/password/register.js';
      import '@cds/core/progress-circle/register.js';
      import '@cds/core/radio/register.js';
      import '@cds/core/range/register.js';
      import '@cds/core/search/register.js';
      import '@cds/core/select/register.js';
      import '@cds/core/tag/register.js';
      import '@cds/core/textarea/register.js';
      import '@cds/core/time/register.js';
      import '@cds/core/toggle/register.js';
      import '@cds/core/tree-view/register.js';`;

    const result = await testBundleSize(bundle);
    expect(result.brotli).toBeLessThan(60);
  });
});
