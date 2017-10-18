import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateItem } from 'components/Wysiwyg/reducer';

// Components
import ReactPlayer from 'react-player';

class WysiwygVideo extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    video: PropTypes.object
  }

  static defaultProps = {
    item: {},
    video: {}
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
    const { video } = this.props;
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

export default connect(
  state => ({
    video: state.wysiwyg.blocks.video
  }),
  { updateItem }
)(WysiwygVideo);
