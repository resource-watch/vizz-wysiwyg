import ReduxProxy from 'cosmos/proxies/redux-proxy';
import IconsProxy from 'cosmos/proxies/icons-proxy';
import GlobalCssProxy from 'cosmos/proxies/global-css-proxy';

// We ensure a specific proxy order
export default [
  // Not all proxies have options, and often relying on defaults is good enough
  IconsProxy(),
  GlobalCssProxy(),
  ReduxProxy
];
