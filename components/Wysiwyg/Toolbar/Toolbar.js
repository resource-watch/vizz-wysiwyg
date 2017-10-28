import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

class Toolbar extends React.Component {
  static propTypes = {
    toolbar: PropTypes.object,
    addItem: PropTypes.func
  }

  static defaultProps = {
    toolbar: {},
    addItem: null
  }

  /**
   * UI EVENTS
   *
  */
  handleClick = (block) => {
    this.props.addItem({
      id: Date.now(),
      type: block
    });
  }

  render() {
    const { toolbar } = this.props;

    return (
      <div className="c-wysiwyg-toolbar">
        <ul>
          {toolbar.buttons.map((t) => {
            return (
              <li
                key={t.block}
              >
                <button
                  className="c-button -small -round -primary"
                  onClick={() => this.handleClick(t.block)}
                >
                  <Icon name={`icon-${t.block}`} />

                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default getContext({
  toolbar: PropTypes.object,
  addItem: PropTypes.func
})(Toolbar);
