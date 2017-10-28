import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

// Recompose
import { getContext } from 'recompose';

// Motion
import { Transition } from 'react-transition-group';

// Drag and drop
import { SortableElement } from 'react-sortable-hoc';

// Components
import ListItemDrag from 'components/Wysiwyg/ListItem/ListItemDrag';
import ListItemActions from 'components/Wysiwyg/ListItem/ListItemActions';
import ListItemContent from 'components/Wysiwyg/ListItem/ListItemContent';

class ListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    position: PropTypes.number,
    setCursor: PropTypes.func
  }

  static defaultProps = {
    item: {},
    position: 0
  }

  state = {
    isHover: false
  }

  /**
   * UI EVENTS
   * - onMouseOver
   * - onMouseOut
  */
  onMouseOver = () => {
    this.setState({ isHover: true });
  }

  onMouseOut = () => {
    this.setState({ isHover: false });
  }

  /**
   * HELPERS
   * - getClasses
   * - getContentClasses
  */
  getClasses() {
    const { isHover } = this.state;

    return classnames({
      '-isDragging': false,
      '-isHover': isHover
    });
  }

  getContentClasses() {
    const { isHover } = this.state;

    return classnames({
      '-isDragging': false,
      '-isHover': isHover
    });
  }

  render() {
    const { item, position } = this.props;
    const { isHover } = this.state;

    return (
      <li
        className={`c-wysiwyg-list-item ${this.getClasses()}`}
        onMouseOver={debounce(() => {
          this.props.setCursor(position);
        }, 100)}
      >
        <div
          className="list-item-container"
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {/* Drag handler */}
          <Transition in={(isHover)} timeout={150}>
            {status => (
              <ListItemDrag
                item={item}
                className={`-${status}`}
              />
            )}
          </Transition>

          {/* Block Actions */}
          <Transition in={(isHover)} timeout={150}>
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
  setCursor: PropTypes.func
})(ListItem));
