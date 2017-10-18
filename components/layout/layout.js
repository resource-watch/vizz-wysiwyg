import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Components
import Head from 'components/layout/head';
import Icons from 'components/layout/icons';
import Header from 'components/layout/header';
import Footer from 'components/layout/footer';

if (process.env.NODE_ENV !== 'production') {
  // TODO
  // If you want to debug the permonace
  // we should check avoidables re-renders
  // const { whyDidYouUpdate } = require('why-did-you-update');
  // whyDidYouUpdate(React);
}

class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
  };

  static defaultProps = {
  };

  render() {
    const { title, description } = this.props;

    return (
      <div className="l-page c-page">
        <Head
          title={title}
          description={description}
        />

        <Icons />

        <Header />

        {this.props.children}

        <Footer />

      </div>
    );
  }
}

export default connect(
  state => ({
    url: state.url
  })
)(Layout);
