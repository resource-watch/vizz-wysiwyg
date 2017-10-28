import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Components
let Editor;
if (typeof document !== 'undefined') {
  /* eslint-disable */
  Editor = require('react-quill');
  /* eslint-enable */
}

class Text extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object,
    updateItem: PropTypes.func
  }

  static defaultProps = {
    item: {},
    blocks: {},
    updateItem: null
  }

  state = {
    content: this.props.item.content
  }

  handleChange = (content) => {
    this.setState({ content }, () => {
      if (this.props.updateItem) {
        this.props.updateItem({
          ...this.props.item,
          content
        });
      }
    });
  }

  render() {
    const { text } = this.props.blocks;
    const { content } = this.state;

    return (
      <div className="c-wysiwyg-text">
        {!!Editor &&
          <Editor
            {...text}
            className="c-quill"
            defaultValue={content}
            onChange={this.handleChange}
          />
        }
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(Text);
