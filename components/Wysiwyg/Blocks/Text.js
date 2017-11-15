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
    onChange: PropTypes.func
  }

  static defaultProps = {
    item: {},
    blocks: {},
    onChange: null
  }

  state = {
    content: this.props.item.content
  }

  handleChange = (content) => {
    this.setState({ content }, () => {
      if (this.props.onChange) {
        this.props.onChange({ content });
      }
    });
  }

  render() {
    const { text } = this.props.blocks;
    const { content } = this.state;

    return (
      <div className="cw-wysiwyg-text">
        {!!Editor &&
          <Editor
            {...text}
            className="cw-quill"
            defaultValue={content}
            onChange={this.handleChange}
          />
        }
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object
})(Text);
