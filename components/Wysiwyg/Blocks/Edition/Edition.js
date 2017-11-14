import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mapValues from 'lodash/mapValues';

import validate from 'validate.js';

// Recompose
import { getContext } from 'recompose';

import { Form, Text } from 'react-form';

class Edition extends React.Component {
  static propTypes = {
    block: PropTypes.string,
    blocks: PropTypes.object,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    blocks: {}
  }

  validations = mapValues(
    this.props.blocks[this.props.block].model,
    m => m.validations
  )

  model = this.props.blocks[this.props.block].model

  handleSubmit = (values) => {
    if (this.props.onSubmit) this.props.onSubmit(values);
  }

  handleValidateError = (values) => {
    const errors = {};
    const errorValidations = validate(values, this.validations);

    // Map throuhg the model keys to set the errors
    Object.keys(this.model).map(k => errors[k] = errorValidations && errorValidations[k]);

    return errors;
  }

  render() {
    return (
      <div className="c-wysiwyg-edition">
        <Form
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
                  {Object.keys(this.model).map((f) => {
                    const fieldClassNames = classnames({
                      [`-${this.model[f].type}`]: !!this.model[f].type
                    });

                    return (
                      <div className={`c-field ${fieldClassNames}`}>
                        <label
                          className="label"
                          htmlFor={this.model[f].id}
                        >
                          {this.model[f].label}
                        </label>

                        <Text
                          field={this.model[f].id}
                          id={this.model[f].id}
                        />

                        {!!touched[f] && !!errors[f] && errors[f].map(e => <div className="error">{e}</div>)}
                      </div>
                    );
                  })}
                </fieldset>

                <div className="form-actions">
                  <button
                    type="submit"
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
})(Edition);
