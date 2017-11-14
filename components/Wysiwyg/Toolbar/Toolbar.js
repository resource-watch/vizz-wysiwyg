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
import Edition from 'components/Wysiwyg/Blocks/Edition/Edition';
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

class Toolbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    toolbar: PropTypes.object,
    blocks: PropTypes.object,
    exclude: PropTypes.array,
    onAdd: PropTypes.func
  }

  static defaultProps = {
    className: '',
    toolbar: {},
    blocks: {},
    exclude: [],
    onAdd: null
  }

  state = {
    opened: false,
    tooltip: null,
    edition: null
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
    const { blocks } = this.props;

    // Check if block has model to fill
    if (blocks[block] && blocks[block].model) {
      this.setState({ edition: block });
    } else {
      this.props.onAdd && this.props.onAdd({
        id: Date.now(),
        type: block
      });

      // Close options
      this.setState({ opened: false, tooltip: null, edition: null });
    }
  }

  triggerSubmitBlock = (block, content) => {
    this.props.onAdd && this.props.onAdd({
      id: Date.now(),
      type: block,
      content
    });

    // Close options
    this.setState({ opened: false, tooltip: null, edition: null });
  }


  render() {
    const { toolbar, exclude, className } = this.props;
    const { opened, tooltip, edition } = this.state;

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
                {toolbar.buttons.filter(t => !exclude.includes(t.block)).map((t) => {
                  return (
                    <li
                      key={t.block}
                      onMouseLeave={() => {
                        if (!edition) {
                          this.setState({ tooltip: null });
                        }
                      }}
                    >
                      <Manager>
                        <Target>
                          <button
                            className="c-button -small -round -primary"
                            onClick={() => this.triggerAddBlock(t.block)}
                            onMouseEnter={() => this.setState({ tooltip: t.block, edition: null })}
                          >
                            <Icon name={`icon-${t.block}`} />
                          </button>
                        </Target>

                        {/* Info tooltip */}
                        {t.block === tooltip && !edition &&
                          <Popper placement="top" className="c-tooltip">
                            {upperFirst(t.block)}
                            <Arrow className="tooltip-arrow" />
                          </Popper>
                        }

                        {/* Model tooltip */}
                        {t.block === tooltip && t.block === edition &&
                          <Popper placement="top" className="c-tooltip -light">
                            <Edition
                              block={t.block}
                              onSubmit={content => this.triggerSubmitBlock(t.block, content)}
                            />
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
  blocks: PropTypes.object
})(Toolbar);
