import React, { Component } from "react";
import PropTypes from "prop-types";

/*** Styles ***/
import styles from "./checkbox.scss";

class Checkbox extends Component {
  state = {
    value: "",
  };

  onChange = (event) => {
    let { onChange } = this.props;
    this.setState({ value: event.target.checked });
    onChange({ [this.props.value]: event.target.checked });
  };

  render() {
    let {
      name,
      label,
      disabled,
      value,
      className,
      clickable,
      onClick,
      defaultValue
    } = this.props;
    return (
      <div
        className={`${"boxWrapper"} ${
          disabled ? "disabled" : ""
        } ${className}`}
      >
        <input
          name={'checkbox'}
          autoComplete={"off"}
          autoFocus={false}
          type={"checkbox"}
          disabled={disabled}
          defaultValue={value ? defaultValue : ''}
          onChange={this.onChange}
          value={value}
        />
        <label v-if={label} htmlFor={'checkbox'}>
          {label}
          <p className={"clickable"} onClick={onClick}>
            {clickable}
          </p>
        </label>
      </div>
    );
  }
}

export default Checkbox;

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.any,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
    disabled: false,
    label: "",
    name: "",
    value: "",
    size: "half",
    className: ''
};
