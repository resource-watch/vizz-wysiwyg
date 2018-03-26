import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Recompose
import { getContext } from 'recompose';

// Components
import Icon from 'components/Wysiwyg/UI/Icon/Icon';

// Blocks
import Toolbar from 'components/Wysiwyg/Toolbar/Toolbar';

class Grid extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    blocks: PropTypes.object,
    readOnly: PropTypes.bool,
    editionMode: PropTypes.bool,
    setEditionMode: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    item: {},
    blocks: {},
    readOnly: false,
    editionMode: false,
    setEditionMode: null
  }

  state = {
    // Change it
    content: this.props.item.content || [null, null],
    edition: null
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
    const { blocks, readOnly } = this.props;
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
            if (!item && readOnly) {
              return null;
            }

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
                    blocks[item.type].Component,
                    {
                      item,
                      readOnly,
                      block: blocks[item.type],
                      onChange: payload => this.triggerChange(payload, i)
                    }
                  )}

                  {/* Actions */}
                  {!readOnly &&
                    <div className={`wysiwyg-grid-column-actions ${btnClassNames}`}>
                      <ul>
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
                  }
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
  readOnly: PropTypes.bool,
  editionMode: PropTypes.bool,
  setEditionMode: PropTypes.func
})(Grid);
