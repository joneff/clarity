/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/*
 * Shim for aria atribute reflection missing in Firefox
 * https://wicg.github.io/aom/aria-reflection-explainer.html
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaLabel
 * Patching missing types as needed
 */
declare global {
  interface HTMLElement {
    // missing from the ARIAMixin interface in TS lib.dom.d.ts
    role: string | null;
    ariaActiveDescendant: string | null;
    ariaControls: string | null;
    ariaLabelledBy: string | null;
  }
}

let roleRegistered = false;
let ariaRegistered = false;

// eslint-disable-next-line
if (!roleRegistered && !Element.prototype.hasOwnProperty('role')) {
  reflect(Element.prototype, 'role', 'role');
  roleRegistered = true;
}

// https://www.w3.org/TR/wai-aria-1.0/states_and_properties
// eslint-disable-next-line
if (!ariaRegistered && !Element.prototype.hasOwnProperty('ariaLabel')) {
  ariaRegistered = true;
  [
    'ActiveDescendant',
    'Atomic',
    'AutoComplete',
    'Busy',
    'Checked',
    'ColCount',
    'ColIndex',
    'ColSpan',
    'Controls',
    'Current',
    'DescribedBy',
    'Details',
    'Disabled',
    'ErrorMessage',
    'Expanded',
    'FlowTo',
    'HasPopup',
    'Hidden',
    'Invalid',
    'KeyShortcuts',
    'Label',
    'LabelledBy',
    'Level',
    'Live',
    'Modal',
    'MultiLine',
    'MultiSelectable',
    'Orientation',
    'Owns',
    'Placeholder',
    'PosInSet',
    'Pressed',
    'ReadOnly',
    'Relevant',
    'Required',
    'RoleDescription',
    'RowCount',
    'RowIndex',
    'RowSpan',
    'Selected',
    'SetSize',
    'Sort',
    'ValueMax',
    'ValueMin',
    'ValueNow',
    'ValueText',
  ].forEach(name => reflect(Element.prototype, `aria-${name.toLowerCase()}`, `aria${name}`));
}

export function reflect(element: HTMLElement | Element, attributeName: string, propertyName: string) {
  Object.defineProperty(element, propertyName, {
    configurable: true,
    enumerable: true,
    get: function () {
      return this.hasAttribute(attributeName) ? this.getAttribute(attributeName) : null;
    },
    set: function (value) {
      if (value !== null) {
        this.setAttribute(attributeName, value);
      } else {
        this.removeAttribute(attributeName);
      }
    },
  });
}
