import React from 'react';
import { setUrl } from 'modules/url';

export default class Page extends React.PureComponent {
  static async getInitialProps({ pathname, query, asPath, store, isServer }) {
    store.dispatch(setUrl({
      pathname,
      query,
      asPath
    }));

    return { isServer };
  }
}
