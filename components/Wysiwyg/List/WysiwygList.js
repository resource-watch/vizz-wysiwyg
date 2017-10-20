import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Drag and drop
import { SortableContainer } from 'react-sortable-hoc';

import WysiwygListItem from 'components/Wysiwyg/ListItem/WysiwygListItem';

class WysiwygList extends React.Component {
  static propTypes = {
    items: PropTypes.array
  }

  static defaultProps = {
    items: []
  }

  render() {
    const { items } = this.props;
    return (
      <ul className="c-wysiwyg-list">
        {items.map((item, index) => (
          <WysiwygListItem
            key={`item-${item.id}`}
            index={index}
            item={item}
          />
        ))}
      </ul>
    );
  }
}

export default SortableContainer(getContext({
  items: PropTypes.array
})(WysiwygList));
