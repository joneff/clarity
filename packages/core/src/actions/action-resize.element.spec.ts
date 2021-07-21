/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { html } from 'lit';
import '@cds/core/actions/register.js';
import { CdsActionResize } from '@cds/core/actions';
import { componentIsStable, createTestElement, onceEvent, removeTestElement } from '@cds/core/test';

describe('cds-action-resize', () => {
  let testElement: HTMLElement;
  let component: CdsActionResize;

  beforeEach(async () => {
    testElement = await createTestElement(html`<cds-action-resize></cds-action-resize>`);
    component = testElement.querySelector<CdsActionResize>('cds-action-resize');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should create the component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should set appropriate aria-label', async () => {
    await componentIsStable(component);
    expect(component.ariaLabel).toBe('Resize');
  });

  it('should trigger a resize event on mouse up', async () => {
    const eventPromise = onceEvent(component, 'resizeChange');
    await componentIsStable(component);
    component.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    component.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 100 }));
    component.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

    const event = await eventPromise;
    expect(event.detail).toBe(100);
  });

  it('should trigger a resize event with left arrow key', async () => {
    const eventPromise = onceEvent(component, 'resizeChange');
    await componentIsStable(component);
    component.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    const event = await eventPromise;
    expect(event.detail).toBe(-10);
  });

  it('should trigger a resize event with right arrow key', async () => {
    const eventPromise = onceEvent(component, 'resizeChange');
    await componentIsStable(component);
    component.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    const event = await eventPromise;
    expect(event.detail).toBe(10);
  });
});
