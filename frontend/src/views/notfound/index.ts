import View from '../../core/view';

class NotfoundView extends View {
  protected addListener (): void {
    // no event
  }

  protected render (): void {
    this.$target.innerHTML = `
      <div class="notfound">
        <h1>Notfound</h1>
      </div>
    `;
  }

  protected mount (): void {
    // no mount
  }
}

export default NotfoundView;
