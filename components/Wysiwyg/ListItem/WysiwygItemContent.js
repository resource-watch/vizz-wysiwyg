import React from 'react';
import PropTypes from 'prop-types';

// Blocks
import WysiwygTitle from 'components/Wysiwyg/Blocks/WysiwygTitle';
import WysiwygParagraph from 'components/Wysiwyg/Blocks/WysiwygParagraph';
import WysiwygImage from 'components/Wysiwyg/Blocks/WysiwygImage';
import WysiwygVideo from 'components/Wysiwyg/Blocks/WysiwygVideo';
import WysiwygEmbed from 'components/Wysiwyg/Blocks/WysiwygEmbed';

class WysiwygItemContent extends React.Component {
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
          <WysiwygTitle item={item} />
        }

        {item.type === 'paragraph' &&
          <WysiwygParagraph item={item} />
        }

        {item.type === 'image' &&
          <WysiwygImage item={item} />
        }

        {item.type === 'video' &&
          <WysiwygVideo item={item} />
        }

        {item.type === 'embed' &&
          <WysiwygEmbed item={item} />
        }
      </div>
    );
  }
}

export default WysiwygItemContent;
