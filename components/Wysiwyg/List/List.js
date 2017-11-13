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
    setCursor: PropTypes.func
  }

  static defaultProps = {
    items: []
  }

  render() {
    const { items } = this.props;
    return (
      <ul
        className="c-wysiwyg-list"
        onMouseLeave={() => {
          this.props.setCursor(null);
        }}
      >
        {items.map((item, index) => (
          <ListItem
            key={`item-${item.id}`}
            index={index}
            position={index}
            item={item}
          />
        ))}

        <Toolbar fixedCursor={items.length} />
      </ul>
    );
  }
}

export default SortableContainer(getContext({
  items: PropTypes.array,
  setCursor: PropTypes.func
})(List));
