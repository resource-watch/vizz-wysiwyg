import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';

// Motion
import { Transition } from 'react-transition-group';

// Drag and drop
import { SortableElement } from 'react-sortable-hoc';

// Components
import Toolbar from 'components/Wysiwyg/Toolbar/Toolbar';
import ListItemDrag from 'components/Wysiwyg/ListItem/ListItemDrag';
import ListItemActions from 'components/Wysiwyg/ListItem/ListItemActions';
import ListItemContent from 'components/Wysiwyg/ListItem/ListItemContent';

class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    cursor: PropTypes.number,
    position: PropTypes.number,
    setCursor: PropTypes.func
  }

  static defaultProps = {
    item: {},
    cursor: 0,
    position: 0,
    setCursor: null
  }

  /**
   * HELPERS
   * - getClasses
   * - getContentClasses
  */
  getClasses() {
    const { item, cursor, position } = this.props;

    return classnames({
      '-isDragging': false,
      '-isHover': (position === cursor),
      [`-${item.type}`]: !!item.type
    });
  }

  getContentClasses() {
    const { item, cursor, position } = this.props;

    return classnames({
      '-isDragging': false,
      '-isHover': (position === cursor),
      [`-${item.type}`]: !!item.type
    });
  }

  render() {
    const { item, cursor, position } = this.props;

    return (
      <li
        className={`c-wysiwyg-list-item ${this.getClasses()}`}
        onMouseOver={() => {
          this.props.setCursor(position);
        }}
      >
        {/* Toolbar */}
        {(position === cursor) &&
          <Toolbar />
        }

        <div
          className="list-item-container"
        >
          {/* Drag handler */}
          <Transition in={(position === cursor)} timeout={150}>
            {status => (
              <ListItemDrag
                item={item}
                className={`-${status}`}
              />
            )}
          </Transition>

          {/* Block Actions */}
          <Transition in={(position === cursor)} timeout={150}>
            {status => (
              <ListItemActions
                item={item}
                className={`-${status}`}
              />
            )}
          </Transition>

          {/* Content */}
          <ListItemContent
            item={item}
            className={this.getContentClasses()}
          />
        </div>
      </li>
    );
  }
}

export default SortableElement(getContext({
  cursor: PropTypes.number,
  setCursor: PropTypes.func
})(ListItem));
