import React from 'react';
import PropTypes from 'prop-types';

// Recompose
import { getContext } from 'recompose';

// Motion
import { Transition } from 'react-transition-group';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

class Toolbar extends React.Component {
  static propTypes = {
    fixedCursor: PropTypes.number,
    toolbar: PropTypes.object,
    addItem: PropTypes.func
  }

  static defaultProps = {
    fixedCursor: null,
    toolbar: {},
    addItem: null
  }

  state = {
    opened: false
  }

  /**
   * UI EVENTS
   * - triggerToggleOptions
   * - triggerAddBlock
  */
  triggerToggleOptions = () => {
    this.setState({ opened: true });
  }

  triggerAddBlock = (block) => {
    const { fixedCursor } = this.props;

    this.props.addItem({
      id: Date.now(),
      type: block
    }, fixedCursor);

    // Close options
    this.setState({ opened: false });
  }

  render() {
    const { toolbar } = this.props;
    const { opened } = this.state;

    return (
      <div className="c-wysiwyg-toolbar">
        <div className="toolbar-handler">
          {/* Drag handler */}
          <Transition in={(!opened)} timeout={150}>
            {status => (
              <div className={`toolbar-handler-button -${status}`}>
                <button
                  className="c-button -primary"
                  onClick={() => this.triggerToggleOptions()}
                >
                  Add
                  <Icon name="icon-add" />
                </button>
              </div>
            )}
          </Transition>

          <Transition in={(opened)} timeout={150}>
            {status => (
              <ul className={`toolbar-handler-list -${status}`}>
                {toolbar.buttons.map((t) => {
                  return (
                    <li
                      key={t.block}
                    >
                      <button
                        className="c-button -small -round -primary"
                        onClick={() => this.triggerAddBlock(t.block)}
                      >
                        <Icon name={`icon-${t.block}`} />

                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </Transition>
        </div>
      </div>
    );
  }
}

export default getContext({
  toolbar: PropTypes.object,
  addItem: PropTypes.func
})(Toolbar);
