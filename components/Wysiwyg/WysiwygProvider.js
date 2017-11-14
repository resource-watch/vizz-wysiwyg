import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from 'recompose';

class WysiwygProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className="c-wysiwyg-provider">
        {React.Children.map(this.props.children, (child) => {
          return child;
        })}
      </div>
    );
  }
}

export default withContext({
  toolbar: PropTypes.object,
  blocks: PropTypes.object,
  items: PropTypes.array,
  cursor: PropTypes.number,
  editionMode: PropTypes.bool,
  setToolbar: PropTypes.func,
  setCursor: PropTypes.func,
  setEditionMode: PropTypes.func,
  setItems: PropTypes.func,
  addItem: PropTypes.func,
  updateItem: PropTypes.func,
  removeItem: PropTypes.func
},
  props => ({
    toolbar: props.toolbar,
    blocks: props.blocks,
    items: props.items,
    cursor: props.cursor,
    editionMode: props.editionMode,
    setToolbar: props.setToolbar,
    setCursor: props.setCursor,
    setEditionMode: props.setEditionMode,
    setItems: props.setItems,
    addItem: props.addItem,
    updateItem: props.updateItem,
    removeItem: props.removeItem
  })
)(WysiwygProvider);
