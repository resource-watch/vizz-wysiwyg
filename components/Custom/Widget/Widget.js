import React from 'react';
import PropTypes from 'prop-types';

class Widget extends React.Component {
  static propTypes = {
    item: PropTypes.object
  }

  static defaultProps = {
    item: {}
  }

  render() {
    const { content } = this.props.item;

    return (
      <div className="cw-wysiwyg-widget">
        <header>
          {content.name}
        </header>

        <img src="/static/images/placeholder.png" alt="placeholder" />
      </div>
    );
  }
}

export default Widget;
