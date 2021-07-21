import { html, LitElement } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { DemoGridRow, DemoService } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function rowDetail() {
  @customElement('demo-grid-row-detail')
  class DemoRowDetail extends LitElement {
    @state() private grid = DemoService.data.grid;
    @state() private selectedRow: DemoGridRow;
    @state() private anchor: HTMLElement;

    render() {
      return html`
        <cds-grid aria-label="row detail datagrid demo" height="360">
          <cds-grid-column type="action" aria-label="row detail column"></cds-grid-column>
          ${this.grid.columns.map(column => html`<cds-grid-column>${column.label}</cds-grid-column>`)}
          ${this.grid.rows.map(row => html`
          <cds-grid-row>
            <cds-grid-cell>
              <cds-action-expand popup="row-detail" action="detail" aria-label="${row.id} details" .pressed=${this.selectedRow?.id === row.id} @click=${(e: any) => this.showDetail(e.target, row)}></cds-action-expand>
            </cds-grid-cell>
            ${row.cells.map((cell, i) => html`<cds-grid-cell .role=${i === 0 ? 'rowheader' : null}>${cell.label}</cds-grid-cell>`)}
          </cds-grid-row>`)}
          <cds-grid-footer></cds-grid-footer>
          <cds-grid-detail aria-label="row details" id="row-detail" ?hidden=${!this.selectedRow} .anchor=${this.anchor} @closeChange=${() => (this.selectedRow = null) as any}>
            <div cds-layout="vertical gap:lg">
              <h2 cds-first-focus cds-text="section">${this.selectedRow?.id}</h2>
              <dl cds-list cds-layout="vertical gap:sm">
                ${this.selectedRow?.cells?.map((cell, i) => html`<dt>${this.grid.columns[i].label}</dt><dd cds-layout="m-b:sm">${cell.label}</dd>`)}
              </dl>
            </div>
          </cds-grid-detail>
        </cds-grid>`;
    }

    private showDetail(anchor: HTMLElement, row: DemoGridRow) {
      if (this.selectedRow?.id !== row.id) {
        this.selectedRow = row;
        this.anchor = anchor;
      } else {
        this.selectedRow = null;
      }
    }

    createRenderRoot() {
      return this;
    }
  }
  return html`<demo-grid-row-detail></demo-grid-row-detail>`;
}
