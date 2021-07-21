/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { testBundleSize, testRenderTime } from 'web-test-runner-performance/browser.js';
import { ellipsisVerticalIcon } from '@cds/core/icon/shapes/ellipsis-vertical.js';
import { ClarityIcons } from '@cds/core/icon/icon.service.js';
import '@cds/core/icon/register.js';

ClarityIcons.addIcons(ellipsisVerticalIcon);

describe('cds-icon bundle performance', () => {
  it(`should bundle and treeshake component in under 15kb`, async () => {
    const result = await testBundleSize(`import '@cds/core/icon/register.js'`);
    expect(result.brotli).toBeLessThan(15);
  });
});

describe('cds-icon render performance', () => {
  const icon = html`<cds-icon shape="ellipsis-vertical"></cds-icon>`;

  it(`should render 1 icon under 15ms`, async () => {
    const result = await testRenderTime(icon);
    expect(result.duration).toBeLessThan(20, { average: 10 });
  });

  it(`should render 100 icons under 50ms`, async () => {
    const result = await testRenderTime(icon, { iterations: 100, average: 5 });
    expect(result.duration).toBeLessThan(50);
  });

  it(`should render 1000 icons under 300ms`, async () => {
    const result = await testRenderTime(icon, { iterations: 1000, average: 5 });
    expect(result.duration).toBeLessThan(300);
  });
});
