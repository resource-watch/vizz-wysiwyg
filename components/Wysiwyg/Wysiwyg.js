import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_TOOLBAR, DEFAULT_BLOCKS } from 'components/Wysiwyg/constants';

// Provider
import WysiwygProvider from 'components/Wysiwyg/WysiwygProvider';

// Components
import Content from 'components/Wysiwyg/Content/Content';
import Icons from 'components/Wysiwyg/UI/Icons/Icons';
import Backdrop from 'components/Wysiwyg/UI/Backdrop/Backdrop';

import 'css/components/wysiwyg/index.scss';

class Wysiwyg extends React.Component {
  static propTypes = {
    toolbar: PropTypes.object,
    blocks: PropTypes.object,
    items: PropTypes.array,
    onChange: PropTypes.func
  }

  static defaultProps = {
    toolbar: DEFAULT_TOOLBAR,
    blocks: DEFAULT_BLOCKS,
    items: [],
    onChange: null
  }

  state = {
    toolbar: this.props.toolbar,
    blocks: this.props.blocks,
    items: this.props.items || [],

    editionMode: false,
    cursor: 0
  }

  // Toolbar
  setToolbar = (toolbar) => {
    this.setState({
      toolbar: { ...this.state.toolbar, ...toolbar }
    });
  }

  setCursor = (cursor) => {
    this.setState({ cursor });
  }

  setEditionMode = (mode) => {
    this.setState({
      editionMode: mode
    });
  }

  // Items
  setItems = (items) => {
    this.setState({ items }, () => {
      this.props.onChange && this.props.onChange(this.state.items);
    });
  }

  addItem = (item, index) => {
    const items = [...this.state.items];
    const cursor = index || this.state.cursor;
    items.splice(cursor, 0, item);

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
      <div
        className="cw-wysiwyg"
        onMouseLeave={() => {
          !this.state.editionMode && this.setCursor(null);
        }}
      >
        <Icons />

        <WysiwygProvider
          {...this.state}
          setToolbar={this.setToolbar}
          setCursor={this.setCursor}
          setEditionMode={this.setEditionMode}
          setItems={this.setItems}
          addItem={this.addItem}
          updateItem={this.updateItem}
          removeItem={this.removeItem}
        >
          <Content />
        </WysiwygProvider>

        <Backdrop isActive={this.state.editionMode} onClick={() => this.setEditionMode(false)} />
      </div>
    );
  }
}

export default Wysiwyg;
