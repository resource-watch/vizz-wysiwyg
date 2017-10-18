import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateItem } from 'components/Wysiwyg/reducer';

class WysiwygEmbed extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    embed: PropTypes.object
  }

  static defaultProps = {
    item: {},
    embed: {}
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
    const { embed } = this.props;
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

export default connect(
  state => ({
    embed: state.wysiwyg.blocks.embed
  }),
  { updateItem }
)(WysiwygEmbed);
