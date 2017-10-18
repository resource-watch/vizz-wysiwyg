import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { setItems } from 'components/Wysiwyg/reducer';

// Drag and drop
import { arrayMove } from 'react-sortable-hoc';

import WysiwygList from 'components/Wysiwyg/List/WysiwygList';

class WysiwygContent extends React.Component {
  static propTypes = {
    wysiwyg: PropTypes.object,
    setItems: PropTypes.func
  }

  static defaultProps = {
    wysiwyg: {},
    setItems: null
  }

  /**
   * UI EVENTS
   * - onSortStart
   * - onSortEnd
   * @param  {Object} drag
   * @return void
  */
  onSortStart = ({ node, index }) => {
    console.log(node, index);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    // Reorder items
    const { wysiwyg } = this.props;
    const items = [...wysiwyg.items];

    // Save them on redux
    this.props.setItems(arrayMove(items, oldIndex, newIndex));
  }

  render() {
    return (
      <WysiwygList
        useDragHandle
        helperClass="-isDragging"
        onSortStart={this.onSortStart}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

export default connect(
  state => ({
    wysiwyg: state.wysiwyg
  }),
  { setItems }
)(WysiwygContent);
