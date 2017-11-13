import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Drag and drop
import { SortableContainer } from 'react-sortable-hoc';

import Toolbar from 'components/Wysiwyg/Toolbar/Toolbar';
import ListItem from 'components/Wysiwyg/ListItem/ListItem';

class List extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    addItem: PropTypes.func
  }

  static defaultProps = {
    items: []
  }

  /**
   * UI EVENTS
   * - onAddItem
  */
  onAddItem = (payload) => {
    const { items } = this.props;
    this.props.addItem(payload, items.length);
  }

  render() {
    const { items } = this.props;
    return (
      <ul className="c-wysiwyg-list">
        {items.map((item, index) => (
          <ListItem
            key={`item-${item.id}`}
            index={index}
            position={index}
            item={item}
          />
        ))}

        <Toolbar onAdd={this.onAddItem} />
      </ul>
    );
  }
}

export default SortableContainer(getContext({
  items: PropTypes.array,
  addItem: PropTypes.func
})(List));
