import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_TOOLBAR, DEFAULT_BLOCKS } from 'components/Wysiwyg/constants';

import WysiwygProvider from 'components/Wysiwyg/WysiwygProvider';
import WysiwygContent from 'components/Wysiwyg/Content/WysiwygContent';
import WysiwygToolbar from 'components/Wysiwyg/Toolbar/WysiwygToolbar';

class Wysiwyg extends React.Component {
  static propTypes = {
    toolbar: PropTypes.object,
    blocks: PropTypes.object,
    items: PropTypes.array
  }

  static defaultProps = {
    toolbar: DEFAULT_TOOLBAR,
    blocks: DEFAULT_BLOCKS,
    items: []
  }

  state = {
    toolbar: this.props.toolbar,
    blocks: this.props.blocks,
    items: this.props.items
  }

  // Toolbar
  setToolbar = (toolbar) => {
    this.setState({
      toolbar: { ...this.state.toolbar, ...toolbar }
    });
  }

  // Items
  setItems = (items) => {
    this.setState({ items }, () => {
      console.info(this.state.items);
    });
  }

  addItem = (item) => {
    const items = [...this.state.items];
    items.push(item);

    this.setItems(items);
  }

  updateItem = (item) => {
    const items = [...this.state.items];
    const index = items.findIndex(i => i.id === item.id);

    items[index] = item;

    this.setItems(items);
  }

  removeItem = (item) => {
    const items = [...this.state.items];
    const index = items.findIndex(i => i.id === item.id);

    items.splice(index, 1);

    this.setItems(items);
  }

  render() {
    return (
      <div className="c-wysiwyg">
        <WysiwygProvider
          {...this.state}
          setToolbar={this.setToolbar}
          setItems={this.setItems}
          addItem={this.addItem}
          updateItem={this.updateItem}
          removeItem={this.removeItem}
        >
          <WysiwygContent />
          <WysiwygToolbar />
        </WysiwygProvider>
      </div>
    );
  }
}

export default Wysiwyg;
