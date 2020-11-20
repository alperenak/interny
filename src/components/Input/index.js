import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

/*** Components ***/
import PlainInput from "./sub-components/Input";
import Select from "./sub-components/Select";
import Checkbox from "./sub-components/Checkbox";
import DateInput from "./sub-components/DatePicker";

class Input extends Component {

  render() {
    let { type } = this.props;

    return (
      <Fragment>
        <PlainInput
          v-if={["text", "password", "number", "textarea", "modal","file"].includes(
            type
          )}
          {...this.props}
        />
        <DateInput v-if={["date"].includes(type)} {...this.props} />
        <Select v-if={type === "select"} {...this.props} />
        <Select v-if={type === "multiselect"} multiple={true} {...this.props} />
        <Checkbox v-if={type === "checkbox"} {...this.props} />
      </Fragment>
    );
  }
}

export default Input;

Input.propTypes = {
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  labelDescription: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.any,
  onClick: PropTypes.any,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  errorList: PropTypes.array,
  validations: PropTypes.object,
  externalSource: PropTypes.array,
  className: PropTypes.string,
  priorValue: PropTypes.string,
};

Input.defaultProps = {
  disabled: false,
  multiple: false,
  label: "",
  name: "",
  type: "text",
  defaultValue: "",
  placeholder: "",
  size: "half",
  errorList: [],
  externalSource: [],
  className: "",
};
