// Import React
import React from 'react';
import PropTypes from 'prop-types';

// Inport the form input
import { FormField } from 'react-form';

class File extends React.Component {
  static propTypes = {
    fieldApi: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }

  render() {
    const { fieldApi, onChange, onBlur, ...rest } = this.props;

    const {
      getValue,
      setValue,
      setTouched
    } = fieldApi;

    return (
      <div className="cw-file">
        <button
          type="button"
          className="cw-button -primary -compressed"
        >
          Browse file
        </button>

        <input
          {...rest}
          value={getValue() || ''}
          onChange={(e) => {
            setValue(e.target.value);
            if (onChange) {
              onChange(e.target.value, e);
            }
          }}
          onBlur={(e) => {
            setTouched();
            if (onBlur) {
              onBlur(e);
            }
          }}
        />
      </div>
    );
  }
}

export default FormField(File);
