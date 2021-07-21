import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { DemoService } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function columnVisibility() {
  @customElement('demo-grid-column-visibility')
  class DemoColumnVisibility extends LitElement {
    @state() private grid = DemoService.data.grid;
    @state() private columnAnchor: HTMLElement;
    @state() private all = this.grid.columns.reduce((p, n) => n.id + p, 0);
    @state() private selectedColumns = this.all;

    render() {
      return html`
        <cds-grid aria-label="column visibility datagrid demo" height="360">
          ${this.grid.columns.map((column, i) => this.checked(this.grid.columns[i].id) ? html`<cds-grid-column>${column.label}</cds-grid-column>` : '')}
          ${this.grid.rows.map(row => html`
          <cds-grid-row>
            ${row.cells.map((cell, i) => html`${this.checked(this.grid.columns[i].id) ? html`<cds-grid-cell>${cell.label}</cds-grid-cell>` : ''}`)}
          </cds-grid-row>`)}
          <cds-grid-footer>
            <cds-action popup="column-visbility" @click=${(e: any) => (this.columnAnchor = e.target)} aria-label="filter column" shape="view-columns" .pressed=${!this.checked(this.all)}></cds-action>
          </cds-grid-footer>
        </cds-grid>
        <cds-dropdown id="column-visbility" ?hidden=${!this.columnAnchor} @closeChange=${(): void => this.columnAnchor = null} .anchor=${this.columnAnchor} position="top">
          <cds-checkbox-group layout="vertical">
            ${this.grid.columns.filter((_c, i) => i !== 0).map(column => html`
            <cds-checkbox>
              <label>${column.label}</label>
              <input type="checkbox" value=${column.id} @click=${this.selectColumns} .checked=${this.checked(column.id)} />
            </cds-checkbox>`)}
          </cds-checkbox-group>
          <cds-button action="flat" @click=${this.selectAll} ?disabled=${this.checked(this.all)}>
            Select All
          </cds-button>
        </cds-dropdown>`;
    }

    private selectColumns() {
      this.selectedColumns = Array.from(this.shadowRoot.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'))
        .filter(c => c.checked)
        .map(c => parseInt(c.value))
        .reduce((p, n) => p + n, 1);
    }

    private selectAll() {
      this.selectedColumns = this.all;
    }

    private checked(value: number) {
      return value === (this.selectedColumns & value);
    }
  }
  return html`<demo-grid-column-visibility></demo-grid-column-visibility>`;
}