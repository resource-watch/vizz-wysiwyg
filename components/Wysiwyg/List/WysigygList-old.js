import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Redux
import { connect } from 'react-redux';
import { setItems } from 'components/Wysiwyg/reducer';

// Drag and drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import WysiwygListItem from 'components/Wysiwyg/ListItem/WysiwygListItem';

class WysiwygList extends React.Component {
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
   * - onDragEnd
   * @param  {Object} drag
   * @return void
  */
  onDragEnd = (drag) => {
    // dropped outside the list
    if (!drag.destination) {
      return;
    }

    // Reorder items
    const { wysiwyg } = this.props;
    const startIndex = drag.source.index;
    const endIndex = drag.destination.index;

    const items = [...wysiwyg.items];
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);

    // Save them on redux
    this.props.setItems(items);
  }

  render() {
    const { wysiwyg } = this.props;
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId="droppable"
        >
          {(provided, snapshot) => {
            const listClassNames = classnames({
              '-isDraggingOver': snapshot.isDraggingOver
            });

            return (
              <div
                ref={provided.innerRef}
                className={`c-wysiwyg-list ${listClassNames}`}
              >
                {/* Loop trough items */}
                {wysiwyg.items.map(item => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                  >
                    {(prov, snap) => {
                      return (
                        <WysiwygListItem
                          item={item}
                          prov={prov}
                          snap={snap}
                        />
                      );
                    }}
                  </Draggable>
                 ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default connect(
  state => ({
    wysiwyg: state.wysiwyg
  }),
  { setItems }
)(WysiwygList);
