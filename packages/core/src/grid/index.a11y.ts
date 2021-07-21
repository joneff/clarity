/*
 * Copyright (c) 2016-2021 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { executeServerCommand } from '@web/test-runner-commands';
import { html, LitElement } from 'lit';
import { createTestElement, removeTestElement, componentIsStable, getA11ySnapshotNodes } from '@cds/core/test';
import { customElement, state } from '@cds/core/internal';
import { ActionSort } from '@cds/core/actions';
import { CdsGrid } from '@cds/core/grid';
import '@cds/core/checkbox/register.js';
import '@cds/core/actions/register.js';
import '@cds/core/button/register.js';
import '@cds/core/search/register.js';
import '@cds/core/radio/register.js';
import '@cds/core/grid/register.js';
import { VoiceOverTest, Commands } from 'web-test-runner-voiceover/browser.js';

describe('cds-grid a11y', () => {
  let component: CdsGrid;
  let element: HTMLElement;

  afterEach(() => {
    removeTestElement(element);
  });

  beforeEach(async () => {
    element = await createTestElement(html`<cds-grid aria-label="basic datagrid" height="360">
      <cds-grid-column>host</cds-grid-column>
      <cds-grid-column>status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>5%</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>vm-host-002</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
        <cds-grid-cell>100%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>`);
    component = element.querySelector<CdsGrid>('cds-grid');
  });

  // https://playwright.dev/docs/api/class-accessibility/#accessibility-snapshot
  it('should create baseline grid accessibility snapshot in safari', async () => {
    await componentIsStable(component);
    const grid: any = await executeServerCommand('a11y:snapshot', { root: 'cds-grid' });
    const nodes = getA11ySnapshotNodes(grid);
    const roles = nodes
      .filter(node => node.role !== 'generic' && node.role !== 'text' && node.role !== 'TextGroup')
      .map(node => node.role);
    const names = nodes.filter(node => node.name !== '').map(node => node.name);
    expect(names).toEqual([
      'basic datagrid',
      'host',
      'status',
      'CPU',
      'Memory',
      'vm-host-001',
      'online',
      '5%',
      '10%',
      'vm-host-002',
      'offline',
      '0%',
      '100%',
      'host',
      'vm-host-001',
      'vm-host-002',
      'status',
      'online',
      'offline',
      'CPU',
      '5%',
      '0%',
      'Memory',
      '10%',
      '100%',
      'host',
      'status',
      'CPU',
      'Memory',
    ]);

    expect(roles).toEqual([
      'grid',
      'row',
      'columnheader',
      'columnheader',
      'columnheader',
      'columnheader',
      'row',
      'gridcell',
      'gridcell',
      'gridcell',
      'gridcell',
      'row',
      'gridcell',
      'gridcell',
      'gridcell',
      'gridcell',
      'Column',
      'columnheader',
      'gridcell',
      'gridcell',
      'Column',
      'columnheader',
      'gridcell',
      'gridcell',
      'Column',
      'columnheader',
      'gridcell',
      'gridcell',
      'Column',
      'columnheader',
      'gridcell',
      'gridcell',
      'TableHeaderContainer',
      'columnheader',
      'columnheader',
      'columnheader',
      'columnheader',
    ]);
  });

  it('should read cells when using virtual cursor in all directions', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'basic datagrid table 4 columns, 3 rows');
    test.queue(Commands.right, 'host column 1 of 4');
    test.queue(Commands.down, 'row 2 of 3 vm-host-001');
    test.queue(Commands.down, 'row 3 of 3 vm-host-002');
    test.queue(Commands.right, 'status offline column 2 of 4');
    test.queue(Commands.up, 'row 2 of 3 online');
    const result = await test.run();

    expect(result.values).toEqual(result.expected);
  });
});

describe('cds-grid row detail', () => {
  let component: CdsGrid;
  let element: HTMLElement;

  @customElement('demo-grid-row-detail')
  class DemoRowDetail extends LitElement {
    @state() private open = false;
    @state() private anchor: HTMLElement;

    render() {
      return html` <cds-grid aria-label="row detail datagrid" height="360">
        <cds-grid-column type="action" aria-label="row detail column"></cds-grid-column>
        <cds-grid-column>host</cds-grid-column>
        <cds-grid-column>status</cds-grid-column>
        <cds-grid-column>CPU</cds-grid-column>
        <cds-grid-column>Memory</cds-grid-column>
        <cds-grid-row>
          <cds-grid-cell>
            <cds-action-expand
              popup="row-detail"
              action="detail"
              aria-label="view details"
              .pressed=${this.open}
              @click=${() => (this.open = true)}
            ></cds-action-expand>
          </cds-grid-cell>
          <cds-grid-cell>vm-host-001</cds-grid-cell>
          <cds-grid-cell>online</cds-grid-cell>
          <cds-grid-cell>5%</cds-grid-cell>
          <cds-grid-cell>10%</cds-grid-cell>
        </cds-grid-row>
        <cds-grid-detail
          id="row-detail"
          ?hidden=${!this.open}
          .anchor=${this.anchor}
          @closeChange=${() => (this.open = false)}
        >
          <div cds-layout="vertical gap:lg">
            <h2 cds-first-focus cds-text="section">vm-host-001</h2>
            <p>Detail Content</p>
          </div>
        </cds-grid-detail>
        <cds-grid-footer></cds-grid-footer>
      </cds-grid>`;
    }

    createRenderRoot() {
      return this;
    }
  }

  afterEach(() => {
    removeTestElement(element);
  });

  beforeEach(async () => {
    element = await createTestElement(html`<demo-grid-row-detail></demo-grid-row-detail>`);
    component = element.querySelector<CdsGrid>('cds-grid');
  });

  it('should read and interact with a row detail view', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'row detail datagrid table 5 columns, 2 rows');
    test.queue(Commands.right, 'blank column 1 of 5');
    test.queue(Commands.right, 'host column 2 of 5');
    test.queue(Commands.down, 'row 2 of 2 vm-host-001');
    test.queue(Commands.left, 'view details toggle button');
    test.queue(Commands.space, 'vm-host-001 and 1 more item web dialog heading level 2 vm-host-001');
    test.queue(Commands.right, 'detail content  clickable'); // todo fix clickable signal
    const result = await test.run();

    expect(result.values).toEqual(result.expected);
  });
});

describe('cds-grid row sort', () => {
  let component: CdsGrid;
  let element: HTMLElement;

  @customElement('demo-grid-row-sort')
  class DemoRowSort extends LitElement {
    @state() private sortType: ActionSort = 'none';

    render() {
      return html` <cds-grid aria-label="row sort datagrid demo" height="360">
        <cds-grid-column
          >host
          <cds-action-sort
            aria-label="sort"
            .sort=${this.sortType}
            @sortChange=${(e: any) => (this.sortType = e.detail)}
          ></cds-action-sort
        ></cds-grid-column>
        <cds-grid-column>status</cds-grid-column>
        <cds-grid-column>CPU</cds-grid-column>
        <cds-grid-column>Memory</cds-grid-column>
        <cds-grid-row>
          <cds-grid-cell>vm-host-001</cds-grid-cell>
          <cds-grid-cell>online</cds-grid-cell>
          <cds-grid-cell>5%</cds-grid-cell>
          <cds-grid-cell>10%</cds-grid-cell>
        </cds-grid-row>
      </cds-grid>`;
    }

    createRenderRoot() {
      return this;
    }
  }

  afterEach(() => {
    removeTestElement(element);
  });

  beforeEach(async () => {
    element = await createTestElement(html`<demo-grid-row-sort></demo-grid-row-sort>`);
    component = element.querySelector<CdsGrid>('cds-grid');
  });

  it('should read and interact with a row sorting', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'row sort datagrid demo table 4 columns, 2 rows');
    test.queue(Commands.right, 'host host column 1 of 4'); // duplicate from aria-label bug in safari
    test.queue(Commands.right, 'sort button');

    // press one
    test.queue(Commands.space, 'sort button');
    test.queue(Commands.right, 'status column 2 of 4');
    test.queue(Commands.down, 'row 2 of 2 online');
    test.queue(Commands.left, 'host vm-host-001 column 1 of 4');
    test.queue(Commands.up, 'row 1 of 2 host sort button sort up');

    // press two
    test.queue(Commands.space, 'row 1 of 2 host sort button sort up');
    test.queue(Commands.right, 'status column 2 of 4');
    test.queue(Commands.down, 'row 2 of 2 online');
    test.queue(Commands.left, 'host vm-host-001 column 1 of 4');
    test.queue(Commands.up, 'row 1 of 2 host sort button sort down');

    const result = await test.run();
    expect(result.values).toEqual(result.expected);
  });
});

describe('cds-grid multi select', () => {
  let component: CdsGrid;
  let testElement: HTMLElement;

  beforeEach(async () => {
    testElement = await createTestElement(html` <cds-grid aria-label="row multi select datagrid" height="360">
      <cds-grid-column type="action">
        <cds-checkbox>
          <input type="checkbox" aria-label="select all hosts" />
        </cds-checkbox>
      </cds-grid-column>
      <cds-grid-column>host</cds-grid-column>
      <cds-grid-column>status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-checkbox>
            <input type="checkbox" value="vm-host-001" aria-label="select vm-host-001" />
          </cds-checkbox>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>5%</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-checkbox>
            <input type="checkbox" value="vm-host-002" aria-label="select vm-host-002" />
          </cds-checkbox>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-002</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>`);
    component = testElement.querySelector<CdsGrid>('cds-grid');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should read and interact with a row selection checkbox', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'row multi select datagrid table 5 columns, 3 rows');
    test.queue(Commands.right, 'select all hosts unchecked checkbox');
    test.queue(Commands.right, 'host column 2 of 5');
    test.queue(Commands.down, 'row 2 of 3 vm-host-001');
    test.queue(Commands.down, 'row 3 of 3 vm-host-002');
    test.queue(Commands.left, 'select vm-host-002 unchecked checkbox');
    test.queue(Commands.space, 'checked select vm-host-002 checkbox');
    test.queue(Commands.up, 'row 2 of 3 select vm-host-001 unchecked checkbox');
    test.queue(Commands.down, 'row 3 of 3 select vm-host-002 checked checkbox');
    test.queue(Commands.right, 'host vm-host-002 column 2 of 5');
    test.queue(Commands.left, 'select all hosts select vm-host-002 checked checkbox column 1 of 5'); // todo: duplicate read on col header label if checkbox already focused

    const result = await test.run();
    expect(result.values).toEqual(result.expected);
  });
});

describe('cds-grid single select', () => {
  let component: CdsGrid;
  let testElement: HTMLElement;

  beforeEach(async () => {
    testElement = await createTestElement(html` <cds-grid aria-label="row single select datagrid" height="360">
      <cds-grid-column type="action" aria-label="row single select"></cds-grid-column>
      <cds-grid-column>host</cds-grid-column>
      <cds-grid-column>status</cds-grid-column>
      <cds-grid-column>CPU</cds-grid-column>
      <cds-grid-column>Memory</cds-grid-column>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-radio>
            <input type="radio" name="select-row" checked value="vm-host-001" aria-label="select vm-host-001" />
          </cds-radio>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-001</cds-grid-cell>
        <cds-grid-cell>online</cds-grid-cell>
        <cds-grid-cell>5%</cds-grid-cell>
        <cds-grid-cell>10%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-row>
        <cds-grid-cell>
          <cds-radio>
            <input type="radio" name="select-row" value="vm-host-002" aria-label="select vm-host-002" />
          </cds-radio>
        </cds-grid-cell>
        <cds-grid-cell>vm-host-002</cds-grid-cell>
        <cds-grid-cell>offline</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
        <cds-grid-cell>0%</cds-grid-cell>
      </cds-grid-row>
      <cds-grid-footer></cds-grid-footer>
    </cds-grid>`);
    component = testElement.querySelector<CdsGrid>('cds-grid');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should read and interact with a row selection radio', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'row single select datagrid table 5 columns, 3 rows');
    test.queue(Commands.right, 'blank column 1 of 5'); // todo: fix blank reporting
    test.queue(Commands.right, 'host column 2 of 5');
    test.queue(Commands.down, 'row 2 of 3 vm-host-001');
    test.queue(Commands.down, 'row 3 of 3 vm-host-002');
    test.queue(Commands.left, 'select vm-host-002 radio button, 2 of 2');
    test.queue(Commands.space, 'selected select vm-host-002 radio button, 2 of 2');
    test.queue(Commands.up, 'row 2 of 3 select vm-host-001 radio button, 1 of 2');
    test.queue(Commands.down, 'row 3 of 3 select vm-host-002 selected radio button, 2 of 2');
    test.queue(Commands.right, 'host vm-host-002 column 2 of 5');
    test.queue(Commands.left, 'column 1 of 5 select vm-host-002 selected radio button, 2 of 2 column 1 of 5');

    const result = await test.run();
    expect(result.values).toEqual(result.expected);
  });
});

describe('cds-grid row action', () => {
  let component: CdsGrid;
  let testElement: HTMLElement;

  @customElement('demo-grid-row-action')
  class DemoRowAction extends LitElement {
    @state() private anchor: HTMLElement;

    render() {
      return html` <cds-grid aria-label="row action datagrid" height="360">
          <cds-grid-column type="action" aria-label="actions"></cds-grid-column>
          <cds-grid-column>host</cds-grid-column>
          <cds-grid-column>status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          <cds-grid-row>
            <cds-grid-cell>
              <cds-action
                popup="row-actions"
                aria-label="vm-host-001 actions"
                @click=${(e: any) => (this.anchor = e.target)}
              ></cds-action>
            </cds-grid-cell>
            <cds-grid-cell>vm-host-001</cds-grid-cell>
            <cds-grid-cell>online</cds-grid-cell>
            <cds-grid-cell>5%</cds-grid-cell>
            <cds-grid-cell>10%</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown
          id="row-actions"
          ?hidden=${!this.anchor}
          .anchor=${this.anchor}
          @closeChange=${() => (this.anchor = null) as void}
        >
          <cds-button action="flat" size="sm">Shutdown</cds-button>
          <cds-button action="flat" size="sm">Restart</cds-button>
        </cds-dropdown>`;
    }

    createRenderRoot() {
      return this;
    }
  }

  beforeEach(async () => {
    testElement = await createTestElement(html`<demo-grid-row-action></demo-grid-row-action>`);
    component = testElement.querySelector<CdsGrid>('cds-grid');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should read and interact with a row action button', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'row action datagrid table 5 columns, 2 rows');
    test.queue(Commands.right, 'blank column 1 of 5'); // todo: fix blank reporting
    test.queue(Commands.right, 'host column 2 of 5');
    test.queue(Commands.down, 'row 2 of 2 vm-host-001');
    test.queue(Commands.left, 'vm-host-001 actions menu pop up collapsed button');
    test.queue(Commands.space, 'shutdown button');
    test.queue(Commands.right, 'restart button');
    test.queue(Commands.right, 'shutdown button');
    test.queue(Commands.escape, 'vm-host-001 actions toggle button row action datagrid table 5 columns, 2 rows');

    const result = await test.run();
    expect(result.values).toEqual(result.expected);
  });
});

describe('cds-grid column filter', () => {
  let component: CdsGrid;
  let testElement: HTMLElement;

  @customElement('demo-grid-column-filter')
  class DemoColumnFilter extends LitElement {
    @state() private anchor: HTMLElement;

    render() {
      return html` <cds-grid aria-label="column filter datagrid" height="360">
          <cds-grid-column
            >host
            <cds-action
              popup="column-filter"
              @click=${(e: any) => (this.anchor = e.target)}
              shape="filter"
              aria-label="search hosts"
            ></cds-action
          ></cds-grid-column>
          <cds-grid-column>status</cds-grid-column>
          <cds-grid-column>CPU</cds-grid-column>
          <cds-grid-column>Memory</cds-grid-column>
          <cds-grid-row>
            <cds-grid-cell>vm-host-001</cds-grid-cell>
            <cds-grid-cell>online</cds-grid-cell>
            <cds-grid-cell>5%</cds-grid-cell>
            <cds-grid-cell>10%</cds-grid-cell>
          </cds-grid-row>
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown
          id="column-filter"
          ?hidden=${!this.anchor}
          .anchor=${this.anchor}
          @closeChange=${() => (this.anchor = null) as any}
        >
          <cds-input>
            <input placeholder="Search" aria-label="search hosts" />
          </cds-input>
        </cds-dropdown>`;
    }

    createRenderRoot() {
      return this;
    }
  }

  beforeEach(async () => {
    testElement = await createTestElement(html`<demo-grid-column-filter></demo-grid-column-filter>`);
    component = testElement.querySelector<CdsGrid>('cds-grid');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should read and interact with a column filter input', async () => {
    await componentIsStable(component);

    const test = new VoiceOverTest();
    test.queue(Commands.right, 'column filter datagrid table 4 columns, 2 rows');
    test.queue(Commands.right, 'host host column 1 of 4'); // duplicate from aria-label bug in safari
    test.queue(Commands.right, 'search hosts menu pop up collapsed button');
    test.queue(Commands.right, 'status column 2 of 4');
    test.queue(Commands.down, 'row 2 of 2 online');
    test.queue(Commands.left, 'host vm-host-001 column 1 of 4');
    test.queue(Commands.up, 'row 1 of 2 host search hosts menu pop up collapsed button');
    test.queue(Commands.space, 'search hosts search edit text');
    test.queue(Commands.escape, 'search hosts toggle button');

    const result = await test.run();
    expect(result.values).toEqual(result.expected);
  });
});
