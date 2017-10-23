import React from 'react';
import PropTypes from 'prop-types';

// Blocks
import Title from 'components/Wysiwyg/Blocks/Title';
import Paragraph from 'components/Wysiwyg/Blocks/Paragraph';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';

class ListItemContent extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    item: {},
    className: ''
  }

  render() {
    const { item, className } = this.props;

    return (
      <div className={`c-wysiwyg-item-content ${className}`}>
        {item.type === 'title' &&
          <Title item={item} />
        }

        {item.type === 'paragraph' &&
          <Paragraph item={item} />
        }

        {item.type === 'image' &&
          <Image item={item} />
        }

        {item.type === 'video' &&
          <Video item={item} />
        }

        {item.type === 'embed' &&
          <Embed item={item} />
        }
      </div>
    );
  }
}

export default ListItemContent;
