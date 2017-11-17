import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';

class ListItemContent extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    className: PropTypes.string,
    blocks: PropTypes.object,
    updateItem: PropTypes.func
  }

  static defaultProps = {
    item: {},
    blocks: {},
    className: ''
  }

  onChange = (payload) => {
    const item = { ...this.props.item, ...payload };

    this.props.updateItem(item);
  }

  render() {
    const { blocks, item, className } = this.props;

    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`cw-wysiwyg-item-content ${classNames}`}>
        {React.createElement(
          blocks[item.type].Component,
          {
            item,
            block: blocks[item.type],
            onChange: this.onChange
          }
        )}
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(ListItemContent);
