import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import upperFirst from 'lodash/upperFirst';

// Recompose
import { getContext } from 'recompose';

// Motion
import { Transition } from 'react-transition-group';

// Popper
import { Manager, Target, Popper, Arrow } from 'react-popper';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';
import Tooltip from 'components/Wysiwyg/UI/Tooltip/Tooltip';

class Toolbar extends React.Component {
  static propTypes = {
    fixedCursor: PropTypes.number,
    className: PropTypes.string,
    toolbar: PropTypes.object,
    addItem: PropTypes.func
  }

  static defaultProps = {
    fixedCursor: null,
    className: '',
    toolbar: {},
    addItem: null
  }

  state = {
    opened: false,
    tooltip: null
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
    const { toolbar, className } = this.props;
    const { opened, tooltip } = this.state;

    const classNames = classnames({
      [className]: !!className
    });

    return (
      <div className={`c-wysiwyg-toolbar ${classNames}`}>
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
                      <Manager>
                        <Target>
                          <button
                            className="c-button -small -round -primary"
                            onClick={() => this.triggerAddBlock(t.block)}
                            onMouseEnter={() => this.setState({ tooltip: t.block })}
                            onMouseLeave={() => this.setState({ tooltip: null })}
                          >
                            <Icon name={`icon-${t.block}`} />
                          </button>
                        </Target>
                        {t.block === tooltip &&
                          <Popper placement="top" className="c-tooltip">
                            {upperFirst(t.block)}
                            <Arrow className="tooltip-arrow" />
                          </Popper>
                        }
                      </Manager>
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
