import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';
import Text from 'components/Wysiwyg/Blocks/Text';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';

class Grid extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object
  }

  static defaultProps = {
    item: {},
    blocks: {}
  }

  state = {
    content: this.props.item.content
  }

  BLOCK_TYPES = {
    text: Text,
    image: Image,
    video: Video,
    embed: Embed
  }

  handleChange = () => {
    // this.setState({ src }, () => {
    //   if (this.props.onChange) this.props.onChange(src);
    // });
  }

  render() {
    const { grid } = this.props.blocks;
    const { content } = this.state;

    const items = content || grid.placeholder.content;

    const gridClassNames = classnames({
      'small-12': true,
      'medium-6': items.length === 2,
      'medium-4': items.length === 3
    });

    return (
      <div className="c-wysiwyg-grid">
        <div className="wysiwyg-grid-row row">
          {(items).map(((item) => {
            return (
              <div key={item.id} className={`column ${gridClassNames}`}>
                {React.createElement(
                  this.BLOCK_TYPES[item.type],
                  { item }
                )}
              </div>
            );
          }))}
        </div>
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  updateItem: PropTypes.func
})(Grid);
