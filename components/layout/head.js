/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import HeadNext from 'next/head';

import Package from '../../package.json';

// Styles
export default class Head extends React.Component {

  static getStyles() {
    if (process.env.NODE_ENV === 'production') {
      // In production, serve pre-built CSS file from /styles/{version}/main.css
      return <link rel="stylesheet" media="all" type="text/css" href={`/styles/${Package.version}/index.css`} />;
    }
    // In development, serve CSS inline (with live reloading) with webpack
    // NB: Not using dangerouslySetInnerHTML will cause problems with some CSS
    return <style dangerouslySetInnerHTML={{ __html: require('css/index.scss') }} />;
  }

  render() {
    const { title, description } = this.props;

    return (
      <HeadNext>
        <title>{title} | React Components</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vizzuality" />

        {/* Favicon */}
        <link rel="apple-touch-icon" href="/static/favicon/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/static/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/static/favicon/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="150x150" href="/static/favicon/mstile-150x150.png" />
        <link rel="icon" type="image/png" sizes="310x150" href="/static/favicon/mstile-310x150.png" />
        <link rel="icon" type="image/png" sizes="310x310" href="/static/favicon/mstile-310x310.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/static/favicon/favicon-144x144.png" />
        <link rel="icon" type="image/png" sizes="70x70" href="/static/favicon/favicon-70x70.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
        <link rel="mask-icon" href="/static/favicon/favicon.svg" color="white" />
        <link rel="manifest" href="/static/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/static/favicon/mstile-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* Styles and scripts */}
        {Head.getStyles()}
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
      </HeadNext>
    );
  }

}

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
