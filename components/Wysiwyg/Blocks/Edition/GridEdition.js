import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Wysiwyg/UI/Icon/Icon';

class GridEdition extends React.Component {
  static propTypes = {
    block: PropTypes.object,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    block: {}
  }

  MODEL = this.props.block.model

  triggerSubmit = (columns) => {
    const content = Array(columns).fill();

    if (this.props.onSubmit) this.props.onSubmit(content);
  }

  render() {
    return (
      <div className="cw-wysiwyg-grid-edition">
        <div className="grid-edition-row">
          <div className="grid-edition-column">
            <button
              className="cw-button -primary -full grid-edition-placeholder"
              onClick={() => this.triggerSubmit(2)}
            >
              <span>2</span>
              <Icon name="icon-add" />
            </button>
          </div>
          <div className="grid-edition-column">
            <button
              className="cw-button -primary -full grid-edition-placeholder"
              onClick={() => this.triggerSubmit(3)}
            >
              <span>3</span>
              <Icon name="icon-add" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GridEdition;
