import { ReactiveControllerHost } from 'lit';

/**
 * Provides all nessesary aria-* attributes to create valid selection state
 */
export class AriaSelectedController {
  constructor(private host: ReactiveControllerHost & HTMLElement & { selected: boolean }) {
    this.host.addController(this);
  }

  hostUpdated() {
    if (this.host.selected !== null && this.host.selected !== undefined) {
      this.host.ariaSelected = this.host.selected ? 'true' : 'false';
    }
  }
}
