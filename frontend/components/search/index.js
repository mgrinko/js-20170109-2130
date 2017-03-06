import Component from '../component';

export default class Search extends Component {
  constructor(options) {
    super(options.el);

    this._field = this._el.querySelector('[data-element="field"]');

    this._field.addEventListener('input', this._onFieldInput.bind(this));
  }

  on(eventName, handler) {
    this._el.addEventListener(eventName, handler);
  }

  off(eventName, handler) {
    this._el.removeEventListener(eventName, handler);
  }

  _trigger(eventName, data) {
    let myEvent = new CustomEvent(eventName, {
      detail: data
    });

    this._el.dispatchEvent(myEvent);
  }

  _onFieldInput() {
    this._trigger('valueChanged', this._field.value);
  }
}