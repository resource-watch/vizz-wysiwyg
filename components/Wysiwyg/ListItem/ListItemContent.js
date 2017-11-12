import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Blocks
import Text from 'components/Wysiwyg/Blocks/Text';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';
import Grid from 'components/Wysiwyg/Blocks/Grid';


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

    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`c-wysiwyg-item-content ${classNames}`}>
        {item.type === 'text' &&
          <Text item={item} />
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

        {item.type === 'grid' &&
          <Grid item={item} />
        }
      </div>
    );
  }
}

export default ListItemContent;
