import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';

// Popper
import { Manager, Target, Popper, Arrow } from 'react-popper';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

// Blocks
import Toolbar from 'components/Wysiwyg/Toolbar/Toolbar';
import Text from 'components/Wysiwyg/Blocks/Text';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';

import ImageEdition from 'components/Wysiwyg/Blocks/Edition/ImageEdition';
import VideoEdition from 'components/Wysiwyg/Blocks/Edition/VideoEdition';
import EmbedEdition from 'components/Wysiwyg/Blocks/Edition/EmbedEdition';

class Grid extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object,
    editionMode: PropTypes.bool,
    setEditionMode: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    item: {},
    blocks: {},
    editionMode: false,
    setEditionMode: null
  }

  state = {
    // Change it
    content: this.props.item.content || [null, null],
    edition: null
  }

  BLOCK_TYPES = {
    text: Text,
    image: Image,
    video: Video,
    embed: Embed
  }

  BLOCK_EDITION_TYPES = {
    image: ImageEdition,
    video: VideoEdition,
    embed: EmbedEdition
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editionMode !== nextProps.editionMode && !nextProps.editionMode) {
      this.triggerClose();
    }
  }

  /**
   * UI EVENTS
   * - triggerAdd
   * - triggerChange
   * - triggerEdit
   * - triggerRemove
   * - triggerClose
   * - triggerSubmit
  */
  triggerAdd = (payload, i) => {
    const content = [...this.state.content];
    content[i] = payload;
    this.setState({ content }, () => {
      this.props.onChange && this.props.onChange({ content });
    });
  }

  triggerChange = (payload, i) => {
    const content = [...this.state.content];
    content[i] = { ...content[i], ...payload };

    this.setState({ content }, () => {
      this.props.onChange && this.props.onChange({ content });
    });
  }

  triggerSubmit = (payload, i) => {
    const content = [...this.state.content];
    content[i] = { ...content[i], ...payload };

    this.setState({ content }, () => {
      this.triggerClose();
      this.props.onChange && this.props.onChange({ content });
    });
  }

  triggerEdit = (block, i) => {
    this.setState({ edition: block + i });
    this.props.setEditionMode && this.props.setEditionMode(true);
  }

  triggerRemove = (i) => {
    const content = [...this.state.content];
    content[i] = null;

    this.setState({ content }, () => {
      this.props.onChange && this.props.onChange({ content });
    });
  }

  triggerClose = () => {
    // Close options
    this.setState({ edition: null });

    this.props.setEditionMode && this.props.setEditionMode(false);
  }

  render() {
    const { grid } = this.props.blocks;
    const { content, edition } = this.state;

    const gridClassNames = classnames({
      'small-12': true,
      'medium-6': content.length === 2,
      'medium-4': content.length === 3
    });

    return (
      <div className="cw-wysiwyg-grid">
        <div className="wysiwyg-grid-row row">
          {content.map(((item, i) => {
            if (!item) {
              return (
                <div key={i} className={`column ${gridClassNames}`}>
                  <div className="wysiwyg-grid-placeholder">
                    <Toolbar
                      className="-no-cursor"
                      exclude={['grid']}
                      onAdd={payload => this.triggerAdd(payload, i)}
                    />
                  </div>
                </div>
              );
            }

            const btnClassNames = classnames({
              '-active': item.type + i === edition
            });

            return (
              <div key={item.id} className={`column ${gridClassNames}`}>
                <div className="wysiwyg-grid-column">
                  {React.createElement(
                    this.BLOCK_TYPES[item.type],
                    { item, onChange: payload => this.triggerChange(payload, i) }
                  )}

                  {/* Actions */}
                  <div className={`wysiwyg-grid-column-actions ${btnClassNames}`}>
                    <ul>
                      {this.props.blocks[item.type].model &&
                        <li>
                          <Manager>
                            <Target>
                              <button
                                type="button"
                                className={`cw-button -small -round -primary ${btnClassNames}`}
                                onClick={() => this.triggerEdit(item.type, i)}
                              >
                                <Icon name="icon-edit" />
                              </button>
                            </Target>

                            {/* Model tooltip */}
                            {item.type + i === edition &&
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
                                  this.BLOCK_EDITION_TYPES[item.type],
                                  {
                                    block: item.type,
                                    onSubmit: c => this.triggerSubmit({ content: c }, i)
                                  }
                                )}
                                <Arrow className="tooltip-arrow" />
                              </Popper>
                            }
                          </Manager>
                        </li>
                      }
                      <li>
                        <button
                          type="button"
                          className="cw-button -small -round -close"
                          onClick={() => this.triggerRemove(i)}
                        >
                          <Icon name="icon-close" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object,
  editionMode: PropTypes.bool,
  setEditionMode: PropTypes.func
})(Grid);
