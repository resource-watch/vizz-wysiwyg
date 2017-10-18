import React from 'react';
import PropTypes from 'prop-types';

import Icons from 'components/layout/icons';

export default () => {
  class IconsProxy extends React.Component {
    static propTypes = {
      nextProxy: PropTypes.shape({
        value: PropTypes.func,
        next: PropTypes.func
      }).isRequired
    }

    render() {
      const {
        nextProxy
      } = this.props;

      return (
        <div>
          <Icons />
          <nextProxy.value
            {...this.props}
            nextProxy={nextProxy.next()}
          />
        </div>
      );
    }
  }

  return IconsProxy;
};
