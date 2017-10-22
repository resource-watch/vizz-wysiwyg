// lib/styleguide/Wrapper.js
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icons from 'components/layout/icons';

import css from 'css/index.scss';


export default class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  static defaultProps = {

  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
          minHeight: 40
        }}
        className="styleguide-wrapper"
      >
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <Icons />

        {this.props.children}
      </div>
    );
  }
}
