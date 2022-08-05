import React from "react";
import { Field, reduxForm } from "redux-form";

//Form will be a react component, that is why has capital F
//reduxForm is a function, basically will have the same functionality as the conenct function that we used from the react-redux library

function renderError({ error, touched }) {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
}

function renderInput({ input, label, meta }) {
  //meta property contains the error message among other properties
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
}

const StreamForm = (props) => {
  // on the props we get a function to handle the form submission and we need to pass it our onSubmit function
  const onSubmit = (formValues) => {
    // event.preventDefault(); reduxForm is going to handle this, so we do not even neet to pass the event as parameter, instead we have to pass the form values
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      {/* this is for anything to create an input for the users,  when using this tag it is necessary to provide some props, 'name' is always required, is the name of the property that this field is going to manage, component is going to be a react component or a function to call that we use to indicate what type of input we will generate   */}
      <Field name="title" component={renderInput} label="Enter title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter description"
      />
      {/* When we add some proprs to our field component, it does not know what to do with them and passes them to our renderInput function */}
      <button className="ui button primary">Submit</button>
    </form>
  );
};

//There is a specific flow for this
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a descriptions";
  }

  return errors;
};

//if an object with values is returned,  with reduxForm we are passing the validate function to our component, and reduxForm will check the name of the key for the error a look for the corresponding input, then it will pass the error as prop to the renderInput function

export default reduxForm({ form: "streamForm", validate })(StreamForm); //passing a name
