import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'initStore';

// Components
import Page from 'components/layout/page';
import Layout from 'components/layout/layout';

import Wysiwyg from 'components/Wysiwyg/Wysiwyg';

class WysiwygPage extends Page {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  }

  static defaultProps = {
    title: 'Wysiwyg',
    description: 'Wysiwyg description'
  }

  render() {
    return (
      <Layout
        title="Wysiwyg"
        description="Wysiwyg description..."
      >
        <Wysiwyg
          items={[
            { id: 1, type: 'text', content: '<h1>This is a title</h1>' },
            { id: 4, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>' },
            { id: 5, type: 'image', src: 'http://cine.netknowsl.netdna-cdn.com/cine/wp-content/uploads/2016/09/1-11.jpg', alt: 'Narcos' },
            { id: 7, type: 'grid', content: [null, null] },
            { id: 6, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>' }
          ]}
        />
      </Layout>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(WysiwygPage);
