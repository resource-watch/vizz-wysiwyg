import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Components
import ReactPlayer from 'react-player';

class Video extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object
  }

  static defaultProps = {
    item: {},
    blocks: {}
  }

  state = {
    url: this.props.item.content.url
  }

  render() {
    const { video } = this.props.blocks;
    const { url } = this.state;

    return (
      <div className="cw-wysiwyg-video">
        <ReactPlayer
          {...video.options}
          url={url}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object
})(Video);
