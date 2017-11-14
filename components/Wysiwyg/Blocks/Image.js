import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

class Image extends React.Component {
  static propTypes = {
    item: PropTypes.object
  }

  static defaultProps = {
    item: {}
  }

  state = {
    src: this.props.item.content.src,
    alt: this.props.item.content.alt
  }

  render() {
    // const { image } = this.props.blocks;
    const { src, alt } = this.state;
    return (
      <div className="c-wysiwyg-image">
        <img
          src={src}
          alt={alt}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object
})(Image);
