export default {
  _handlers: {},

  on(eventName, handler) {
    if (!this._handlers[eventName]) {
      this._handlers[eventName] = [];
    }

    this._handlers[eventName].push(handler);
  },

  off(eventName, handler) {
    if (!this._handlers[eventName]) {
      return;
    }

    let index = this._handlers[eventName].indexOf(handler);

    if (index === -1) {
      return;
    }

    this._handlers[eventName].splice(index, 1);
  },

  trigger(eventName, data) {
    this._handlers[eventName].forEach((handler) => {
      handler(data);
    });
  }
};