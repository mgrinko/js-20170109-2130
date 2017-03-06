export default class Component {
  constructor(element) {
    this._el = element;
  }

  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }

  off(eventName, handler) {
    this._el.removeEventListener(eventName, handler);
  }

  show() {
    this._el.classList.remove('components-hidden');
  }

  hide() {
    this._el.classList.add('components-hidden');
  }

  _trigger(eventName, data) {
    let myEvent = new CustomEvent(eventName, {
      detail: data
    });

    this._el.dispatchEvent(myEvent);
  }
}