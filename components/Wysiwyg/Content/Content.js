import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Drag and drop
import { arrayMove } from 'react-sortable-hoc';

import List from 'components/Wysiwyg/List/List';

class Content extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    setItems: PropTypes.func
  }

  static defaultProps = {
    items: [],
    setItems: null
  }

  /**
   * UI EVENTS
   * - onSortStart
   * - onSortEnd
   * @param  {Object} drag
   * @return void
  */
  onSortEnd = ({ oldIndex, newIndex }) => {
    // Reorder items
    const items = [...this.props.items];

    this.props.setItems(arrayMove(items, oldIndex, newIndex));
  }

  render() {
    return (
      <List
        useDragHandle
        // pressDelay={200}
        // pressThreshold={3}
        helperClass="-isDragging"
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

export default getContext({
  items: PropTypes.array,
  setItems: PropTypes.func
})(Content);
