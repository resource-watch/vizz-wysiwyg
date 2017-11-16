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

  render() {
    const { src, alt } = this.props.item.content;
    return (
      <div className="cw-wysiwyg-image">
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
