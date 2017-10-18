import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Motion
import { Transition } from 'react-transition-group';

// Drag and drop
import { SortableElement } from 'react-sortable-hoc';

// Components
import WysiwygItemDrag from 'components/Wysiwyg/ListItem/WysiwygItemDrag';
import WysiwygItemActions from 'components/Wysiwyg/ListItem/WysiwygItemActions';
import WysiwygItemContent from 'components/Wysiwyg/ListItem/WysiwygItemContent';

class WysiwygListItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    prov: PropTypes.object,
    snap: PropTypes.object
  }

  static defaultProps = {
    item: {},
    prov: {},
    snap: {}
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
    const { snap } = this.props;
    const { isHover } = this.state;

    return classnames({
      '-isDragging': snap.isDragging,
      '-isHover': isHover || snap.isDragging
    });
  }

  getContentClasses() {
    const { snap } = this.props;
    const { isHover } = this.state;

    return classnames({
      '-isDragging': snap.isDragging,
      '-isHover': isHover || snap.isDragging
    });
  }

  render() {
    const { item, prov, snap } = this.props;
    const { isHover } = this.state;

    // List classnames

    return (
      <li className={`c-wysiwyg-list-item ${this.getClasses()}`}>
        <div
          className="list-item-container"
          ref={prov.innerRef}
          style={prov.draggableStyle}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          {/* Drag handler */}
          <Transition in={(isHover || snap.isDragging)} timeout={150}>
            {status => (
              <WysiwygItemDrag
                item={item}
                prov={prov}
                className={`-${status}`}
              />
            )}
          </Transition>

          {/* Block Actions */}
          <Transition in={(isHover || snap.isDragging)} timeout={150}>
            {status => (
              <WysiwygItemActions
                item={item}
                className={`-${status}`}
              />
            )}
          </Transition>

          {/* Content */}
          <WysiwygItemContent
            item={item}
            className={this.getContentClasses()}
          />
        </div>

        {prov.placeholder}
      </li>
    );
  }
}

export default SortableElement(WysiwygListItem);
