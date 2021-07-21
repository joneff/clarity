import { ReactiveControllerHost } from 'lit';
import { isNumericString, listenForAttributeListChange, onFirstInteraction } from '@cds/core/internal';

export type GridColumnSize = ReactiveControllerHost &
  HTMLElement & {
    width?: string;
    type?: string;
  };

export class GridColumnSizeController {
  private observers: (ResizeObserver | MutationObserver)[] = [];

  private get hostGrid() {
    return this.host.parentElement as HTMLElement & { rows: NodeListOf<any> };
  }

  constructor(private host: GridColumnSize) {
    this.host.addController(this);
  }

  async hostConnected() {
    this.setActionWidth();
    this.hostGrid.shadowRoot?.addEventListener('slotchange', () => this.setActionWidth());
    this.observers.push(listenForAttributeListChange(this.host, ['type'], () => this.setActionWidth()));
    await this.host.updateComplete;
    await onFirstInteraction(this.hostGrid);

    this.host.shadowRoot?.addEventListener('resizeChange', (e: any) => {
      this.host.dispatchEvent(new CustomEvent('resizeChange', { detail: e.detail, bubbles: true }));
      this.updateResizedColumnWidth(e.detail);
    });
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.updateSetColumnWidth();
  }

  hostDisconnected() {
    this.observers.forEach(o => o.disconnect());
  }

  private setActionWidth() {
    if (this.host.type === 'action' || this.host.getAttribute('type') === 'action') {
      this.host.width = '36px';
      const index = Array.from((this.hostGrid as any).columns).indexOf(this.host);
      this.hostGrid.rows.forEach(r => r.cells[index].setAttribute('type', 'action'));
    }
  }

  private updateSetColumnWidth() {
    if (this.host.width && this.host.ariaColIndex !== undefined) {
      this.hostGrid.style.setProperty(
        `--ch${this.host.ariaColIndex}`,
        isNumericString(this.host.width) ? `${this.host.width}px` : this.host.width
      );
    }
  }

  private updateResizedColumnWidth(width: number) {
    const updatedWidth = Math.max(
      isNumericString(this.host.width) || this.host.width?.includes('px') ? parseInt(this.host.width) : 36,
      parseInt(getComputedStyle(this.host).width) + width
    );
    this.hostGrid.style.setProperty(`--ch${this.host.ariaColIndex}`, `${updatedWidth}px`);
  }
}
