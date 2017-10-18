import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateItem } from 'components/Wysiwyg/reducer';

// Components
import Editor from 'react-medium-editor';

class WysiwygParagraph extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    paragraph: PropTypes.object,
    updateItem: PropTypes.func
  }

  static defaultProps = {
    item: {},
    paragraph: {},
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
    const { paragraph } = this.props;
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

export default connect(
  state => ({
    paragraph: state.wysiwyg.blocks.paragraph
  }),
  { updateItem }
)(WysiwygParagraph);
