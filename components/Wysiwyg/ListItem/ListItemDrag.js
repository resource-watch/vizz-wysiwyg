import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Drag and drop
import { SortableHandle } from 'react-sortable-hoc';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

class ListItemDrag extends React.Component {
  static propTypes = {
    prov: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    item: {},
    prov: {},
    className: '',
    removeItem: null
  }

  render() {
    const { prov, className } = this.props;
    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`cw-wysiwyg-item-drag ${classNames}`}>
        <ul className="item-drag">
          <li>
            <button
              type="button"
              className="cw-button -primary -round -small"
              {...prov.dragHandleProps}
            >
              <Icon name="icon-drag_handle" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default SortableHandle(ListItemDrag);
