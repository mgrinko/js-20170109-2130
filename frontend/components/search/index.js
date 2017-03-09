import Component from '../component';

export default class Search extends Component {
  constructor(options) {
    super(options.el);

    this._field = this._el.querySelector('[data-element="field"]');

    this._field.addEventListener('input', this._onFieldInput.bind(this));
  }

  _onFieldInput() {
    this._trigger('valueChanged', this._field.value);
  }
}