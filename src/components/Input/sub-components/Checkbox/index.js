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
    } = this.props;
    return (
      <div
        className={`${styles.boxWrapper} ${
          disabled ? styles.disabled : ""
        } ${className}`}
      >
        <input
          name={name}
          autoComplete={"off"}
          autoFocus={false}
          type={"checkbox"}
          disabled={disabled}
          onChange={this.onChange}
          value={value}
        />
        <label v-if={label} htmlFor={name}>
          {label}
          <p className={styles.clickable} onClick={onClick}>
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
  size: PropTypes.string,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  disabled: false,
  label: "",
  name: "",
  value: "",
  size: "half",
  className: "",
};
