import React from 'react';
import PropTypes from 'prop-types';

import css from 'css/index.scss';

export default () => {
  class GlobalCssProxy extends React.Component {
    static propTypes = {
      nextProxy: PropTypes.shape({
        value: PropTypes.func,
        next: PropTypes.func
      }).isRequired
    }

    componentDidMount() {
      if (css) {
        const node = document.createElement('style');
        node.appendChild(document.createTextNode(css));
        document.head.appendChild(node);
        this.globalStyleNode = node;
      }
    }

    componentWillUnmount() {
      if (this.globalStyleNode) {
        document.head.removeChild(this.globalStyleNode);
      }
    }

    render() {
      const {
        nextProxy
      } = this.props;

      return (
        <nextProxy.value
          {...this.props}
          nextProxy={nextProxy.next()}
        />
      );
    }
  }

  return GlobalCssProxy;
};
