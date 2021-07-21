import { LitElement, html } from 'lit';
import { baseStyles, i18n, I18nService, property, state } from '@cds/core/internal';
import { GridColumnSizeController } from './grid-column-size.controller.js';
import { GridColumnPositionController } from './grid-column-position.controller.js';
import styles from './grid-column.element.scss';

/**
 * Grid Column
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 *
 * @element cds-grid-column
 * @csspart column
 * @cssprop --min-height
 * @cssprop --min-width
 * @cssprop --justify-content
 * @cssprop --padding-block
 * @cssprop --padding-inline-start
 * @cssprop --padding-inline-end
 */
export class CdsGridColumn extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  @property({ type: String }) width?: string | null;

  @property({ type: String }) type: '' | 'action';

  @property({ type: Boolean }) resizable = false;

  @property({ type: String }) position: '' | 'sticky' | 'fixed' = '';

  @state({ type: String, attribute: 'slot', reflect: true }) slot = 'columns';

  protected gridColumnSizeController = new GridColumnSizeController(this);

  protected gridColumnPositionController = new GridColumnPositionController(this);

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="column">
        <slot></slot>
        <cds-action-resize .readonly=${!this.resizable}></cds-action-resize>
        <div class="line"></div>
      </div>
    `;
  }
}
