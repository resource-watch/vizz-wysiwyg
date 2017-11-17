import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mapValues from 'lodash/mapValues';

import validate from 'validate.js';

import { Form, Text, Select } from 'react-form';

class ImageEdition extends React.Component {
  static propTypes = {
    block: PropTypes.object,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    block: {}
  }

  MODEL = this.props.block.model

  triggerSubmit = (values) => {
    if (this.props.onSubmit) this.props.onSubmit(values);
  }

  render() {
    return (
      <div className="c-widget-edition">
        <p>Custom edition bla bla bla</p>

        <button
          className="cw-button -primary"
          onClick={() => {
            this.triggerSubmit({ name: 'hello' });
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default ImageEdition;
