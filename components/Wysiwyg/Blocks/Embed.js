import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

class Embed extends React.Component {
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
    width: this.props.item.width,
    height: this.props.item.height
  }

  handleChange = () => {
    // this.setState({ src }, () => {
    //   if (this.props.onChange) this.props.onChange(src);
    // });
  }

  render() {
    const { embed } = this.props.blocks;
    const { src, width, height } = this.state;
    return (
      <div className="c-wysiwyg-embed">
        <iframe
          frameBorder="0"
          src={src || embed.placeholder.src}
          width={width || embed.placeholder.width}
          height={height || embed.placeholder.height}
        />
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(Embed);
