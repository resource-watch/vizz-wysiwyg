import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tooltip extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const { className } = this.props;
    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`c-tooltip ${classNames}`}>
        {React.Children.map(this.props.children, (child) => {
          return child;
        })}
      </div>
    );
  }
}


export default Tooltip;
