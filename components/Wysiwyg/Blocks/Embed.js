import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

class Embed extends React.Component {
  static propTypes = {
    item: PropTypes.object
  }

  static defaultProps = {
    item: {}
  }

  state = {
    src: this.props.item.content.src,
    width: this.props.item.content.width || '100%',
    height: this.props.item.content.height || '400px'
  }

  render() {
    const { src, width, height } = this.state;

    return (
      <div className="c-wysiwyg-embed">
        <iframe
          frameBorder="0"
          src={src}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object
})(Embed);
