import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateItem } from 'components/Wysiwyg/reducer';

class WysiwygImage extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    image: PropTypes.object
  }

  static defaultProps = {
    item: {},
    image: {}
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
    const { image } = this.props;
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

export default connect(
  state => ({
    image: state.wysiwyg.blocks.image
  }),
  { updateItem }
)(WysiwygImage);
