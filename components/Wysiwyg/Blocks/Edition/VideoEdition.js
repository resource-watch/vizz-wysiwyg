import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mapValues from 'lodash/mapValues';

import validate from 'validate.js';

// Recompose
import { getContext } from 'recompose';

import { Form, Text, Select } from 'react-form';

class VideoEdition extends React.Component {
  static propTypes = {
    block: PropTypes.string,
    blocks: PropTypes.object,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    blocks: {}
  }

  VALIDATIONS = mapValues(
    this.props.blocks[this.props.block].model,
    m => m.validations
  )

  MODEL = this.props.blocks[this.props.block].model

  FORM_ELEMENTS = {
    text: Text,
    select: Select
  }

  handleSubmit = (values) => {
    if (this.props.onSubmit) this.props.onSubmit(values);
  }

  handleValidateError = (values) => {
    const errors = {};
    const errorValidations = validate(values, this.VALIDATIONS);

    // Map throuhg the model keys to set the errors
    Object.keys(this.MODEL).map(k => errors[k] = errorValidations && errorValidations[k]);

    return errors;
  }

  render() {
    return (
      <div className="c-wysiwyg-edition">
        <Form
          defaultValues={mapValues(this.MODEL, m => m.defaultValue)}
          onSubmit={this.handleSubmit}
          // validateSuccess={this.handleValidate}
          validateError={this.handleValidateError}
        >
          {(formApi) => {
            const { touched, errors } = formApi;

            return (
              <form
                id="form"
                className="c-form"
                autoComplete="off"
                onSubmit={formApi.submitForm}
              >
                <fieldset className="c-fieldset">
                  {Object.keys(this.MODEL).map((f) => {
                    const fieldClassNames = classnames({
                      [`-${this.MODEL[f].type}`]: !!this.MODEL[f].type
                    });

                    return (
                      <div key={this.MODEL[f].id} className={`c-field ${fieldClassNames}`}>
                        <label
                          className="label"
                          htmlFor={this.MODEL[f].id}
                        >
                          {this.MODEL[f].label}
                        </label>

                        {React.createElement(
                          this.FORM_ELEMENTS[this.MODEL[f].type],
                          {
                            field: this.MODEL[f].id,
                            id: this.MODEL[f].id,
                            ...this.MODEL[f].type === 'select' && { options: this.MODEL[f].options || [] }
                          }
                        )}

                        {!!touched[f] && !!errors[f] && errors[f].map((e, i) => <div key={i} className="error">{e}</div>)}
                      </div>
                    );
                  })}
                </fieldset>

                <div className="form-actions">
                  <button
                    type="button"
                    className="c-button -primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

export default getContext({
  blocks: PropTypes.object
})(VideoEdition);
