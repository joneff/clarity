/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { testBundleSize, testRenderTime } from 'web-test-runner-performance/browser.js';
import '@cds/core/badge/register.js';

describe('cds-badge performance', () => {
  const badge = html`<cds-badge></cds-badge>`;

  it(`should bundle and treeshake badge`, async () => {
    expect((await testBundleSize('@cds/core/badge/register.js')).kb).toBeLessThan(14);
  });

  it(`should render 1 badge under 15ms`, async () => {
    expect((await testRenderTime(badge)).duration).toBeLessThan(20);
  });

  it(`should render 100 badges under 50ms`, async () => {
    expect((await testRenderTime(badge)).duration).toBeLessThan(50);
  });
});