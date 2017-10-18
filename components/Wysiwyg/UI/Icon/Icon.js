import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    name: '',
    className: ''
  }

  render() {
    const { name, className } = this.props;
    return (
      <svg className={`c-icon ${className || ''}`}>
        <use xlinkHref={`#${name}`} />
      </svg>
    );
  }
}

export default Icon;
