import View from '../../core/view';
import FilterBoxViewModel from '../../view-models/filter-box';

class FilterBoxView extends View {
  private filterBoxViewModel: FilterBoxViewModel;
  private label: string;

  constructor ($target: HTMLElement, label: string) {
    super($target);
    this.filterBoxViewModel = new FilterBoxViewModel(this);
    this.label = label;
  }

  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div>${this.label} ${this.filterBoxViewModel.getTotalPrice(this.label)}<div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default FilterBoxView;
