import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setToolbar, setItems } from 'components/Wysiwyg/reducer';

import WysiwygContent from 'components/Wysiwyg/Content/WysiwygContent';
import WysiwygToolbar from 'components/Wysiwyg/Toolbar/WysiwygToolbar';

class Wysiwyg extends React.Component {
  static propTypes = {
    toolbar: PropTypes.object,
    items: PropTypes.array,
    setToolbar: PropTypes.func,
    setItems: PropTypes.func
  }

  static defaultProps = {
    toolbar: {},
    items: [],
    setToolbar: null,
    setItems: null
  }

  componentWillMount() {
    this.initStore();
  }

  initStore = () => {
    if (this.props.toolbar) {
      this.props.setToolbar(this.props.toolbar);
    }
    if (this.props.items) {
      this.props.setItems(this.props.items);
    }
  }

  render() {
    return (
      <div className="c-wysiwyg">
        <WysiwygContent />
        <WysiwygToolbar />
      </div>
    );
  }
}

export default connect(
  state => ({
    wysiwyg: state.wysiwyg
  }),
  {
    setToolbar,
    setItems
  }
)(Wysiwyg);
