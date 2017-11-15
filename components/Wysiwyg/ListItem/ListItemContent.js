import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';

// Blocks
import Text from 'components/Wysiwyg/Blocks/Text';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';
import Grid from 'components/Wysiwyg/Blocks/Grid';


class ListItemContent extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    className: PropTypes.string,
    updateItem: PropTypes.func
  }

  static defaultProps = {
    item: {},
    className: ''
  }

  onChange = (payload) => {
    const item = { ...this.props.item, ...payload };
    this.props.updateItem(item);
  }

  render() {
    const { item, className } = this.props;

    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`cw-wysiwyg-item-content ${classNames}`}>
        {item.type === 'text' &&
          <Text item={item} onChange={this.onChange} />
        }

        {item.type === 'image' &&
          <Image item={item} onChange={this.onChange} />
        }

        {item.type === 'video' &&
          <Video item={item} onChange={this.onChange} />
        }

        {item.type === 'embed' &&
          <Embed item={item} onChange={this.onChange} />
        }

        {item.type === 'grid' &&
          <Grid item={item} onChange={this.onChange} />
        }
      </div>
    );
  }
}

export default getContext({
  updateItem: PropTypes.func
})(ListItemContent);
