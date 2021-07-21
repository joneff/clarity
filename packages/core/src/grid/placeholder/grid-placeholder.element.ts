import { LitElement, html } from 'lit';
import { baseStyles, i18n, I18nService } from '@cds/core/internal';
import styles from './grid-placeholder.element.scss';

/**
 * Grid Placeholder
 *
 * ```typescript
 * import '@cds/core/grid/register.js';
 * ```
 *
 * @element cds-grid-placeholder
 * @csspart placeholder
 */
export class CdsGridPlaceholder extends LitElement {
  @i18n() i18n = I18nService.keys.grid;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div role="row">
        <div role="cell" part="placeholder" cds-layout="vertical gap:lg align:center">
          <slot>
            <cds-icon shape="filter" size="xl"></cds-icon>
            ${this.draggable ? html`<p cds-text="message">${this.i18n.noData}</p>` : ''}
          </slot>
        </div>
      </div>
    `;
  }
}
