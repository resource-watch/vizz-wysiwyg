import React from 'react';
import PropTypes from 'prop-types';

import { getContext } from 'recompose';

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
    console.log(toolbar);

    return (
      <div className="c-wysiwyg-toolbar">
        <ul>
          {toolbar.buttons.map((t) => {
            return (
              <li
                key={t.block}
              >
                <button
                  className="c-button -primary"
                  onClick={() => this.handleClick(t.block)}
                >
                  {t.block}
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
