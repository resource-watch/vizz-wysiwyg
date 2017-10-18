import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Redux
import { connect } from 'react-redux';

// Constants
import { HEADER_NAV } from 'constants/header';

// Components
import { Link } from 'routes';

class Header extends React.Component {
  static propTypes = {
    url: PropTypes.object
  }

  static defaultProps = {
    url: {}
  }

  render() {
    return (
      <header className="c-header">
        <nav>
          <h1 className="header-logo">
            React components
          </h1>
        </nav>
        <nav className="header-nav">
          <ul>
            {HEADER_NAV.map((item) => {
              const navItemClassnames = classnames({
                '-active': (this.props.url.pathname === item.pathname)
              });
              return (
                <li key={item.route}>
                  <Link
                    route={item.route}
                    params={item.params}
                  >
                    <a className={navItemClassnames}>{item.label}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    );
  }
}

export default connect(
  state => ({
    url: state.url
  })
)(Header);
