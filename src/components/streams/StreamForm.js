import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  //descructure the error and touched from meta
  renderError = ({ error, touched }) => {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  // the destructure in input will take out all properties from formProps.input
  renderInput = (formProps) => {
    const className = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        <div>{this.renderError(formProps.meta)}</div>
      </div>
    );
  };
  // don't need to pass event and do preventDefault cause redux-form auto handled
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      // this.props.handleSubmit() is provided by redux-form, then pass our callback function as para
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          // Field must have component property returns a React component or function
          // added label property in Field here, it will auto pass to formProps as a property
          name="title"
          component={this.renderInput}
          label="Enter Title"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// define outside of the component，传进底下的reduxForm function里
// 这里的errors.title会自动匹配Field里面的name property，errors.description 同理
// 若有错误，这里的error会传进Field的component参数里，可以从fromProps的meta里取出来
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// reduxForm function only takes one object para
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
