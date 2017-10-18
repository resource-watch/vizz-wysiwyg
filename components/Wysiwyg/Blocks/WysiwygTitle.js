import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateItem } from 'components/Wysiwyg/reducer';

// Components
import Editor from 'react-medium-editor';

class WysiwygTitle extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    title: PropTypes.object,
    updateItem: PropTypes.func
  }

  static defaultProps = {
    item: {},
    title: {},
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
    const { title } = this.props;
    const { content } = this.state;

    return (
      <div className="c-wysiwyg-title">
        <Editor
          {...title}
          text={content || title.placeholder.text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    title: state.wysiwyg.blocks.title
  }),
  { updateItem }
)(WysiwygTitle);
