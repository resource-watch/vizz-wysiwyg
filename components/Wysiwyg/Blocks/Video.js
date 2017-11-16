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

  render() {
    const { video } = this.props.blocks;
    const { url } = this.props.item.content;

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
