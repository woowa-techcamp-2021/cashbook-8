class PubSub {
  private actions: { [key: string]: Function[] } = { };

  subscribe (action: string, callback: Function) {
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
