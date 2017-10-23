import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Components
import Editor from 'components/Wysiwyg/Editor/Editor';

class Paragraph extends React.Component {
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
    const { paragraph } = this.props.blocks;
    const { content } = this.state;

    return (
      <div className="c-wysiwyg-paragraph">
        <Editor
          {...paragraph}
          text={content || paragraph.placeholder.text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(Paragraph);
