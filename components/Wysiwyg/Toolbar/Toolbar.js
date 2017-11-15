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
import ImageEdition from 'components/Wysiwyg/Blocks/Edition/ImageEdition';
import VideoEdition from 'components/Wysiwyg/Blocks/Edition/VideoEdition';
import EmbedEdition from 'components/Wysiwyg/Blocks/Edition/EmbedEdition';
import GridEdition from 'components/Wysiwyg/Blocks/Edition/GridEdition';

class Toolbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    toolbar: PropTypes.object,
    blocks: PropTypes.object,
    editionMode: PropTypes.bool,
    exclude: PropTypes.array,
    onAdd: PropTypes.func,
    setEditionMode: PropTypes.func
  }

  static defaultProps = {
    className: '',
    toolbar: {},
    blocks: {},
    editionMode: false,
    exclude: [],
    onAdd: null,
    setEditionMode: null
  }

  state = {
    opened: false,
    tooltip: null,
    edition: null
  }

  BLOCK_EDITION_TYPES = {
    image: ImageEdition,
    video: VideoEdition,
    embed: EmbedEdition,
    grid: GridEdition
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editionMode !== nextProps.editionMode && !nextProps.editionMode) {
      this.triggerClose();
    }
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
      this.setState({ tooltip: block, edition: block });
      this.props.setEditionMode && this.props.setEditionMode(true);
    } else {
      this.props.onAdd && this.props.onAdd({
        id: Date.now(),
        type: block
      });

      this.triggerClose();
    }
  }

  triggerSubmitBlock = (block, content) => {
    this.props.onAdd && this.props.onAdd({
      id: Date.now(),
      type: block,
      content
    });

    this.triggerClose();
  }

  // Helpers
  triggerClose = () => {
    // Close options
    this.setState({ opened: false, tooltip: null, edition: null });

    this.props.setEditionMode && this.props.setEditionMode(false);
  }

  render() {
    const { toolbar, editionMode, exclude, className } = this.props;
    const { opened, tooltip, edition } = this.state;

    const classNames = classnames({
      '-edition': edition,
      [className]: !!className
    });

    return (
      <div className={`cw-wysiwyg-toolbar ${classNames}`}>
        <div className="toolbar-handler">
          {/* Drag handler */}
          <Transition in={(!opened)} timeout={150}>
            {status => (
              <div className={`toolbar-handler-button -${status}`}>
                <button
                  type="button"
                  className="cw-button -primary"
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
                  const btnClassNames = classnames({
                    '-active': t.block === edition
                  });

                  return (
                    <li
                      key={t.block}
                      onMouseLeave={() => {
                        if (!edition && !editionMode) {
                          this.setState({ tooltip: null });
                        }
                      }}
                    >
                      <Manager>
                        <Target>
                          <button
                            type="button"
                            className={`cw-button -small -round -primary ${btnClassNames}`}
                            onClick={() => this.triggerAddBlock(t.block)}
                            onMouseEnter={() => !editionMode && this.setState({ tooltip: t.block, edition: null })}
                          >
                            <Icon name={`icon-${t.block}`} />
                          </button>
                        </Target>

                        {/* Info tooltip */}
                        {t.block === tooltip && !edition &&
                          <Popper placement="top" className="cw-tooltip">
                            {upperFirst(t.block)}
                            <Arrow className="tooltip-arrow" />
                          </Popper>
                        }

                        {/* Model tooltip */}
                        {t.block === tooltip && t.block === edition &&
                          <Popper
                            className="cw-tooltip -light"
                            placement="bottom"
                            modifiers={{
                              preventOverflow: {
                                boundariesElement: 'viewport'
                              }
                            }}
                          >
                            {React.createElement(
                              this.BLOCK_EDITION_TYPES[t.block],
                              {
                                onSubmit: content => this.triggerSubmitBlock(t.block, content),
                                block: t.block
                              }
                            )}
                            <Arrow className="tooltip-arrow" />
                          </Popper>
                        }
                      </Manager>
                    </li>
                  );
                })}
                <li key="close">
                  <button
                    type="button"
                    className="cw-button -small -round -close"
                    onClick={this.triggerClose}
                  >
                    <Icon name="icon-close" />
                  </button>
                </li>
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
  blocks: PropTypes.object,
  editionMode: PropTypes.bool,
  setEditionMode: PropTypes.func
})(Toolbar);
