import View from './view';

class ViewModel {
  protected view: View;

  constructor (view: View) {
    this.view = view;
    this.subscribe();
  }

  protected subscribe () { }
}

export default ViewModel;
