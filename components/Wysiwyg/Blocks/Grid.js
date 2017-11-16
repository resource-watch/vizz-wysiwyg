import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

// Blocks
import Toolbar from 'components/Wysiwyg/Toolbar/Toolbar';
import Text from 'components/Wysiwyg/Blocks/Text';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';

class Grid extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    item: {},
    blocks: {}
  }

  state = {
    // Change it
    content: this.props.item.content || [null, null]
  }

  BLOCK_TYPES = {
    text: Text,
    image: Image,
    video: Video,
    embed: Embed
  }


  /**
   * UI EVENTS
   * - handleAdd
   * - handleChange
  */
  handleAdd = (payload, i) => {
    const content = [...this.state.content];
    content[i] = payload;
    this.setState({ content }, () => {
      this.props.onChange && this.props.onChange({ content });
    });
  }

  handleChange = (payload, i) => {
    const content = [...this.state.content];
    content[i] = { ...content[i], ...payload };

    this.setState({ content }, () => {
      this.props.onChange && this.props.onChange({ content });
    });
  }

  handleClose = (i) => {
    const content = [...this.state.content];
    content[i] = null;

    this.setState({ content }, () => {
      this.props.onChange && this.props.onChange({ content });
    });
  }

  render() {
    const { grid } = this.props.blocks;
    const { content } = this.state;

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
                      onAdd={payload => this.handleAdd(payload, i)}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className={`column ${gridClassNames}`}>
                <div className="wysiwyg-grid-column">
                  {React.createElement(
                    this.BLOCK_TYPES[item.type],
                    { item, onChange: payload => this.handleChange(payload, i) }
                  )}

                  {/* Actions */}
                  <div className="wysiwyg-grid-column-actions">
                    <ul>
                      {this.props.blocks[item.type].model &&
                        <li>
                          <button
                            type="button"
                            className="cw-button -small -round -primary"
                            // onClick={() => this.handleClose(i)}
                          >
                            <Icon name="icon-add" />
                          </button>
                        </li>
                      }
                      <li>
                        <button
                          type="button"
                          className="cw-button -small -round -close"
                          onClick={() => this.handleClose(i)}
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
  blocks: PropTypes.object
})(Grid);
