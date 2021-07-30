type CallbackFunctions = () => void;

class PubSub {
  private actions: { [key: string]: CallbackFunctions[] } = { };

  subscribe (action: string, callback: CallbackFunctions) {
    if (!(action in this.actions)) {
      this.actions[action] = [];
    }

    this.actions[action].push(callback);
  }

  publish (action: string) {
    this.actions[action].forEach((cb) => cb());
  }
}

export default new PubSub();
