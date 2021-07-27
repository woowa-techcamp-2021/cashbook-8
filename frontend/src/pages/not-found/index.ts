class Notfound {
  private $root: HTMLElement;

  constructor ($root: HTMLElement) {
    this.$root = $root;
  }

  render () {
    this.$root.innerHTML = `
      <div class="notfound">
        <h1 class="notfound__title">Notfound</h1>
      </div>
    `;
  }
}

export default Notfound;
