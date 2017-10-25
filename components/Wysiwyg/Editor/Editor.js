import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

let MediumEditor;
if (typeof document !== 'undefined') {
  /* eslint-disable */
  MediumEditor = require('medium-editor');
  /* eslint-enable */
}

export default class Editor extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    text: PropTypes.string,
    options: PropTypes.object,

    // Functions
    onChange: PropTypes.func
  };

  static defaultProps = {
    tag: 'div',
    text: '',
    options: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    this.medium = new MediumEditor(dom, this.props.options);

    this.medium.subscribe('editableInput', () => {
      this._updated = true;
      if (this.props.onChange) this.props.onChange(dom.innerHTML, this.medium);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this._updated) {
      this.setState({ text: nextProps.text });
    }

    if (this._updated) this._updated = false;
  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const tag = this.props.tag;
    const props = omit(this.props, ['options', 'text', 'tag', 'contentEditable', 'dangerouslySetInnerHTML']);

    if (this.medium) {
      this.medium.saveSelection();
    }

    return React.createElement(tag, {
      ...props,
      dangerouslySetInnerHTML: { __html: this.state.text }
    });
  }

}
