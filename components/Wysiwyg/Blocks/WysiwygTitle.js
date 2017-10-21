import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Components
import WysiwygEditor from 'components/Wysiwyg/Editor/WysiwygEditor';

class WysiwygTitle extends React.Component {
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
    const { title } = this.props.blocks;
    const { content } = this.state;

    return (
      <div className="c-wysiwyg-title">
        <WysiwygEditor
          {...title}
          text={content || title.placeholder.text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(WysiwygTitle);
