import { LitElement, html } from 'lit';
import { query } from 'lit/decorators/query.js';
import {
  baseStyles,
  createId,
  state,
  property,
  DraggableListController,
  KeyNavigationGridController,
  AriaGridController,
  querySlotAll,
  GridRangeSelectionController,
  ScrollableVisibilityController,
  i18n,
  I18nService,
  AriaMultiSelectableController,
} from '@cds/core/internal';
import { CdsGridRow } from '../row/grid-row.element.js';
import { CdsGridCell } from '../cell/grid-cell.element.js';
import { CdsGridColumn } from '../column/grid-column.element.js';
import { GridLayoutController } from './grid-layout.controller.js';
import styles from './grid.element.scss';

/**
 * Grid
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 *
 * @element cds-grid
 * @event rangeSelectionChange
 * @cssprop --background
 * @cssprop --body-height
 * @cssprop --scrollbar-background
 * @cssprop --scrollbar-thumb-background
 * @cssprop --column-height
 * @cssprop --row-height
 * @cssprop --scroll-padding-top
 * @cssprop --row-content-visibility
 * @cssprop --column-text-align
 * @cssprop --cell-text-algin
 */
export class CdsGrid extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  @property({ type: String }) columnLayout: 'fixed' | 'flex' = 'fixed';

  @property({ type: String }) height: string;

  @property({ type: String }) border: 'row' | 'cell' | 'column' | 'none' | 'stripe' = 'row';

  @property({ type: String }) selectable: 'multi' | 'single' | null;

  @property({ type: Boolean }) rangeSelection = true;

  @property({ type: Boolean }) scrollLock = false;

  @state({ type: String, reflect: true }) protected _id = createId();

  @query('.row-group', true) readonly rowGroup: HTMLElement;

  @query('.column-row', true) readonly columnRow: HTMLElement;

  @query('.column-group', true) readonly columnGroup: HTMLElement;

  @querySlotAll('cds-grid-row') readonly rows: NodeListOf<CdsGridRow>;

  @querySlotAll('cds-grid-cell') readonly cells: NodeListOf<CdsGridCell>;

  @querySlotAll('cds-grid-column') readonly columns: NodeListOf<CdsGridColumn>;

  readonly grid = this;

  protected ariaGridController = new AriaGridController(this);

  protected ariaMultiSelectableController = new AriaMultiSelectableController(this);

  protected gridLayoutController = new GridLayoutController(this);

  protected keyNavigationGridController = new KeyNavigationGridController(this);

  protected gridRangeSelectionController = new GridRangeSelectionController(this);

  protected scrollableVisibilityController = new ScrollableVisibilityController(this);

  protected draggableColumnController = new DraggableListController(this, {
    layout: 'horizontal',
    item: 'cds-grid-column',
    dropZone: 'cds-grid-column',
  });

  protected draggableListController = new DraggableListController(this, {
    layout: 'vertical',
    item: 'cds-grid-row',
    dropZone: 'cds-grid-placeholder',
    manageFocus: false,
  });

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div class="private-host">
        <div class="scroll-container">
          <div class="column-group">
            <div class="column-row">
              <!-- todo: prevent slot change on intialization -->
              <slot name="columns" @slotchange=${() => this.ariaGridController.update()}>
                <cds-grid-column draggable-hidden>
                  <span cds-layout="display:screen-reader-only">${this.i18n.noData}</span>
                </cds-grid-column>
              </slot>
            </div>
          </div>
          <div class="row-group">
            <!-- todo: prevent slot change on intialization -->
            <slot @slotchange=${() => this.ariaGridController.update()}>
              <cds-grid-placeholder></cds-grid-placeholder>
            </slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
        <slot name="detail"></slot>
      </div>
    `;
  }
}
