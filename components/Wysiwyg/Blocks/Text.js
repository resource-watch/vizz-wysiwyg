import React from 'react';
import PropTypes from 'prop-types';

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
    block: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    item: {},
    block: {},
    onChange: null
  }

  state = {
    content: this.props.item.content
  }

  triggerChange = (content) => {
    this.setState({ content }, () => {
      if (this.props.onChange) {
        this.props.onChange({ content });
      }
    });
  }

  render() {
    const { block } = this.props;
    const { content } = this.state;

    return (
      <div className="cw-wysiwyg-text">
        {!!Editor &&
          <Editor
            {...block}
            className="cw-quill"
            defaultValue={content}
            onChange={this.triggerChange}
          />
        }
      </div>
    );
  }
}

export default Text;
