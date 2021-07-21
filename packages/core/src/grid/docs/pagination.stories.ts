import { html, LitElement, PropertyValues } from 'lit';
import { customElement, state } from '@cds/core/internal';
import { DemoGridRow, DemoService, filter, paginate } from '@cds/core/demo';

export default {
  title: 'Stories/Grid',
  component: 'cds-grid',
};

export function pagination() {
  @customElement('demo-grid-pagination')
  class DemoPagination extends LitElement {
    @state() private grid = DemoService.data.grid;
    @state() private filteredList: DemoGridRow[] = [];
    @state() private search = '';
    @state() private currentPage = 0;
    @state() private pageSize = 10;
    @state() private pageCount = 1;

    render() {
      return html`
        <cds-grid aria-label="pagination datagrid demo" height="360">
          ${this.grid.columns.map(column => html`<cds-grid-column>${column.label}</cds-grid-column>`)}
          ${this.filteredList.map(row => html`
          <cds-grid-row>
            ${row.cells.map(cell => html`<cds-grid-cell>${cell.label}</cds-grid-cell>`)}
          </cds-grid-row>`)}
          <cds-grid-footer>
            <cds-pagination aria-label="pagination">
              <cds-select control-width="shrink">
                <select .value=${this.pageSize.toString()} @input=${(e: any) => (this.pageSize = e.target.value)} style="width: 46px" aria-label="per page">
                  <option value="5">5</option>
                  <option value="10" selected>10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                </select>
              </cds-select>
              <cds-pagination-button aria-label="go to first" ?disabled=${this.currentPage === 0} action="first" @click=${this.firstPage}></cds-pagination-button>
              <cds-pagination-button aria-label="go to previous" ?disabled=${this.currentPage === 0} action="prev" @click=${this.prevPage}></cds-pagination-button>
              <cds-input cds-pagination-number>
                <input type="number" size="1" aria-label="current page" @input=${this.setPage} .valueAsNumber=${this.currentPage + 1} min="1" max=${this.pageCount} />
                <cds-control-message>/ ${this.pageCount}</cds-control-message>
              </cds-input>
              <cds-pagination-button aria-label="go to next" ?disabled=${this.currentPage === this.pageCount - 1} action="next" @click=${this.nextPage}></cds-pagination-button>
              <cds-pagination-button aria-label="go to last" ?disabled=${this.currentPage === this.pageCount - 1} action="last" @click=${this.lastPage}></cds-pagination-button>
            </cds-pagination>
            <!-- <cds-grid-pagination .page="0" .pageSize="10" .pageCount="3" @pageChange=""></cds-grid-pagination> -->
          </cds-grid-footer>
        </cds-grid>`;
    }

    connectedCallback() {
      super.connectedCallback();
      this.updateList();
    }

    updated(props: PropertyValues) {
      super.updated(props);
      if (
        (props.has('currentPage') && props.get('currentPage') !== this.currentPage) ||
        (props.has('search') && props.get('search') !== this.search) ||
        (props.has('pageSize') && props.get('pageSize') !== this.pageSize)
      ) {
        this.updateList();
      }

      if (props.has('search') && props.get('search') !== this.search) {
        this.firstPage();
      }
    }

    private updateList() {
      const list = filter([...this.grid.rows], 'id', this.search);
      this.pageCount = Math.ceil(list.length / this.pageSize);
      this.filteredList = paginate(list, this.pageSize)[this.currentPage] ?? [];
    }

    private setPage(event: any) {
      this.currentPage = parseInt(event.target.value) - 1;
    }

    private nextPage() {
      if (this.currentPage <= this.pageCount) {
        this.currentPage++;
      }
    }

    private prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    }

    private firstPage() {
      this.currentPage = 0;
    }

    private lastPage() {
      this.currentPage = Math.ceil(this.grid.rows.length / this.pageSize) - 1;
    }

    protected createRenderRoot() {
      return this;
    }
  }
  return html`<demo-grid-pagination></demo-grid-pagination>`;
}