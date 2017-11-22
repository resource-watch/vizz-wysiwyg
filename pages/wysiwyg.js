import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'initStore';

// Components
import Page from 'components/layout/page';
import Layout from 'components/layout/layout';

import Wysiwyg from 'components/Wysiwyg/Wysiwyg';

// Custom block
import Widget from 'components/Custom/Widget/Widget';
import WidgetEdition from 'components/Custom/Widget/Edition/WidgetEdition';

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
          blocks={{
            widget: {
              Component: Widget,
              EditionComponent: WidgetEdition,
              renderer: 'modal'
            }
          }}
          items={[
            { id: 1, type: 'text', content: '<h1>This is a title</h1>' },
            { id: 2, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>' },
            { id: 3, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
            { id: 4, type: 'image', content: { src: 'https://media.istockphoto.com/photos/jordanian-dessert-at-sunrise-picture-id185099703?s=2048x2048', alt: 'Placeholder' } },
            { id: 5, type: 'video', content: { url: 'https://www.youtube.com/watch?v=IAaGFLWQQjw' } },
            { id: 6, type: 'grid', content: [ { id: 51, type: 'embed', content: { src: 'https://staging.resourcewatch.org/embed/widget/7592da9e-8844-429d-9f2b-0147dde29ff5' } }, { id: 52, type: 'embed', content: { src: 'https://staging.resourcewatch.org/embed/widget/acf093a0-c627-4ca7-9963-9cf1cc0c563e' } } ] }
          ]}
          onChange={items => console.info(items)}
          onUploadImage={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve('https://media.istockphoto.com/photos/jordanian-dessert-at-sunrise-picture-id185099703?s=2048x2048');
              }, 2000);
            });
          }}
        />
      </Layout>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = null;

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(WysiwygPage);
