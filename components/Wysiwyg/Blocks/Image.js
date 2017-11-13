import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

class Image extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object
  }

  static defaultProps = {
    item: {},
    blocks: {}
  }

  state = {
    src: this.props.item.src,
    alt: this.props.item.alt
  }

  handleChange = () => {
    // this.setState({ src }, () => {
    //   if (this.props.onChange) this.props.onChange(src);
    // });
  }

  render() {
    const { image } = this.props.blocks;
    const { src, alt } = this.state;
    return (
      <div className="c-wysiwyg-image">
        <img
          src={src || image.placeholder.src}
          alt={alt || image.placeholder.alt}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object
})(Image);
