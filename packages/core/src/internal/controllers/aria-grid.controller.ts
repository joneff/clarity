import { ReactiveControllerHost } from 'lit';
import { isSafari, isWindows } from '../utils/browser.js';
import { onChildListMutation } from '../utils/events.js';
import { getFlattenedFocusableItems } from '../utils/traversal.js';

export interface AriaGrid {
  grid?: HTMLElement;
  rows: NodeListOf<HTMLElement>;
  rowGroup: HTMLElement;
  cells: NodeListOf<HTMLElement>;
  columns: NodeListOf<HTMLElement>;
  columnRow: HTMLElement;
  columnGroup: HTMLElement;
}

/**
 * Provides all nessesary role/aria-* attributes to create a vaild aria grid
 * https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html
 */
export class AriaGridController {
  private observers: MutationObserver[] = [];

  private grid: AriaGrid;

  constructor(
    private host: ReactiveControllerHost & HTMLElement & AriaGrid,
    private config: { update: 'mutation' | 'slot' } = { update: 'slot' }
  ) {
    host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.intializeColumnSort();
    this.update();

    if (this.config.update === 'slot') {
      this.host.shadowRoot.addEventListener('slotchange', () => this.host.updateComplete.then(() => this.update()));
    } else {
      this.observers.push(onChildListMutation(this.host, () => this.host.updateComplete.then(() => this.update())));
    }
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  update() {
    // create one copy per update to prevent multiple DOM queries from @query getters
    this.grid = {
      grid: this.host.grid ? this.host.grid : this.host,
      rows: this.host.rows,
      rowGroup: this.host.rowGroup,
      cells: this.host.cells,
      columns: this.host.columns,
      columnRow: this.host.columnRow,
      columnGroup: this.host.columnGroup,
    };

    this.initializeGrid();
    this.intializeColumns();
    this.initializeRows();
    this.initializeCells();
  }

  private intializeColumnSort() {
    this.host.addEventListener('sortChange', (e: any) => {
      const col = e.composedPath().find((i: HTMLElement) => i.role === 'columnheader');
      if (col) {
        col.ariaSort = e.detail;
      }
    });
  }

  private initializeGrid() {
    this.grid.grid.role = 'grid';
    this.grid.grid.ariaRowCount = `${this.grid.rows?.length + 1}`;
    this.grid.grid.ariaColCount = `${this.grid.columns.length}`;
    this.grid.rowGroup.role = 'rowgroup';
    this.grid.columnGroup.role = 'rowgroup';
    this.grid.columnRow.role = 'row';
    this.grid.columnRow.ariaRowIndex = '1';
  }

  private intializeColumns() {
    this.grid.columns.forEach((c, i) => {
      c.role = 'columnheader';
      c.ariaColIndex = `${i + 1}`;
      c.ariaSort = 'none';
      this.patchInvalidScreenReaderBehavior(c);
    });
  }

  private initializeRows() {
    this.grid.rows?.forEach((r, i) => {
      r.role = 'row';
      r.ariaRowIndex = `${i + 2}`; // +2 for column header row offset
    });
  }

  /**
   * If cell has focusable items NVDA will go into forms mode (expected behavior)
   * Use table navigation ctrl+alt+arrow to move in and out of cells
   * https://github.com/nvaccess/nvda/issues/7718
   */
  private initializeCells() {
    const colsCount = this.grid.columns.length;
    this.grid.cells?.forEach((c, i) => {
      if (!c.role) {
        c.role = 'gridcell';
      }
      c.ariaColIndex = `${(i % colsCount) + 1}`; // colindex starts at 1
    });
  }

  /**
   * Only visible columnheader text should be read to SRs but Safari/VO and NVDA violates the spec
   * and deep merges any labeled content within the header even if hidden or interactive.
   * This will apply a patch to force Safari and NVDA to read only the provided aria-label
   *
   * https://github.com/nvaccess/nvda/pull/12763
   * https://github.com/nvaccess/nvda/issues/12392
   * https://github.com/nvaccess/nvda/issues/10096
   * https://github.com/nvaccess/nvda/issues/6826
   * https://github.com/nvaccess/nvda/issues/11181
   */
  private patchInvalidScreenReaderBehavior(c: HTMLElement) {
    if (isSafari() || isWindows()) {
      const fousableItems = getFlattenedFocusableItems(c).filter((c: any) => !c.readonly);
      const label = c.ariaLabel ? c.ariaLabel : c.textContent.trim();
      if (fousableItems.length && label.length) {
        c.ariaLabel = label;
        c.setAttribute('scope', 'col');
      }
    }
  }
}
