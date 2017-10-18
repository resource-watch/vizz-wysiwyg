import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Drag and drop
import { SortableContainer } from 'react-sortable-hoc';

import WysiwygListItem from 'components/Wysiwyg/ListItem/WysiwygListItem';

class WysiwygList extends React.Component {
  static propTypes = {
    wysiwyg: PropTypes.object
  }

  static defaultProps = {
    wysiwyg: {}
  }

  render() {
    const { wysiwyg } = this.props;
    return (
      <ul className="c-wysiwyg-list">
        {wysiwyg.items.map((item, index) => (
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

export default SortableContainer(connect(
  state => ({
    wysiwyg: state.wysiwyg
  })
)(WysiwygList));
