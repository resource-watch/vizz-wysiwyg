import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Components
import ReactPlayer from 'react-player';

class WysiwygVideo extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object
  }

  static defaultProps = {
    item: {},
    blocks: {}
  }

  state = {
    url: this.props.item.url
  }

  handleChange = () => {
    // this.setState({ src }, () => {
    //   if (this.props.onChange) this.props.onChange(src);
    // });
  }

  render() {
    const { video } = this.props.blocks;
    const { url } = this.state;

    return (
      <div className="c-wysiwyg-video">
        <ReactPlayer
          {...video.options}
          url={url || video.placeholder.url}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(WysiwygVideo);
