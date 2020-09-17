import React, { Component } from "react";
import PropTypes from "prop-types";

/*** Utils ***/
import validation from "../../../../utils/validations";
import errorTexts from "../../../../utils/errorTexts";

/*** Styles ***/
import styles from "./input.scss";

/*** Icons ***/
import checkmarkIcon from "../../../../icons/checkmark-verify-interface-symbol-button.svg";
import closeIcon from "../../../../icons/close-circular-button-symbol.svg";

class PlainInput extends Component {
  state = {
    value: "",
    errorList: [],
    valid: true,
  };

  componentDidMount() {
    let { validations } = this.props;
    validations &&
      Object.keys(validations).map((e) =>
        this.setState((state) => {
          state.errorList = [
            ...state.errorList,
            { key: e, text: errorTexts[e], valid: false },
          ];
          return state;
        })
      );
  }

  onChange = (event) => {
    let { onChange, validations } = this.props;
    let { value } = event.target;
    this.setState((state) => {
      state.value = value;
      state.valid = validation.checkValidation(
        value,
        validations,
        state.errorList
      );
      return state;
    });
    if (onChange) onChange(value);
  };

  render() {
    let {
      name,
      label,
      labelDescription,
      type,
      disabled,
      icon,
      onKeyDown,
      priority,
      defaultValue,
      placeholder,
      size,
      className,
      onClick,
      priorValue,
      disclaimer,
    } = this.props;
    let { value, errorList, valid } = this.state;
    return (
      <div
        onClick={onClick}
        className={`${styles.inputWrapper} ${
          disabled ? styles.disabled : ""
        } ${className}`}
      >
        <label v-if={label} htmlFor={name}>
          {label}
        </label>
        <div v-if={labelDescription} className={styles.labelDescription}>
          {labelDescription}
        </div>
        <textarea
          v-if={type === "textarea"}
          className={`
                        ${styles.inputContainer} 
                        ${type === "textarea" ? styles.textarea : ""} 
                        ${styles[size]} ${!valid ? styles.error : ""}`}
          name={name}
          autoComplete={"off"}
          autoFocus={false}
          onKeyDown={onKeyDown}
          type={type}
          disabled={disabled}
          onChange={(e) => this.onChange(e)}
          value={priority ? priorValue : value ? value : defaultValue}
          placeholder={placeholder}
        />
        <div
          v-else
          className={`
                        ${styles.inputContainer} 
                        ${type === "textarea" ? styles.textArea : ""} 
                        ${styles[size]} ${!valid ? styles.error : ""}
                        ${styles[this.props.className]}`}
        >
          <img
            v-if={icon && icon.position === "left"}
            src={icon.src}
            alt={"icon"}
            className={`${styles.icon} ${styles[icon.position]}`}
          />
          <input
            name={name}
            autoComplete={"off"}
            autoFocus={false}
            type={type}
            onKeyDown={onKeyDown}
            disabled={disabled}
            onChange={(e) => this.onChange(e)}
            value={priority ? priorValue : value ? value : defaultValue}
            placeholder={placeholder}
          />
          <img
            v-if={icon && icon.position === "right"}
            src={icon.src}
            alt={"icon"}
            className={`${styles.icon} ${styles[icon.position]}`}
          />
        </div>
        <div
          v-if={errorList.length === 1 && !valid}
          className={styles.errorMessage}
        >
          {errorList[0].text}
        </div>

        <ul v-if={errorList.length > 1 && !valid} className={styles.tooltip}>
          {errorList.map((err, i) => {
            return (
              <li className={err.valid ? styles.validText : ""} key={i}>
                <img
                  v-if={!err.valid}
                  width={10}
                  src={closeIcon}
                  alt={"icon"}
                />
                <img
                  v-if={err.valid}
                  width={10}
                  src={checkmarkIcon}
                  alt={"icon"}
                />
                {err.text}
              </li>
            );
          })}
        </ul>
        {disclaimer && <div className={styles.disclaimer}> {disclaimer} </div>}
      </div>
    );
  }
}

export default PlainInput;

PlainInput.propTypes = {
  disabled: PropTypes.bool,
  validations: PropTypes.object,
  label: PropTypes.string,
  labelDescription: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.object,
  onChange: PropTypes.any,
  onKeyDown: PropTypes.any,
  onClick: PropTypes.any,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  errorList: PropTypes.array,
  className: PropTypes.string,
  priorValue: PropTypes.string,
  priority: PropTypes.bool,
};

PlainInput.defaultProps = {
  disabled: false,
  priority: false,
  label: "",
  name: "",
  type: "text",
  defaultValue: "",
  placeholder: "placeholder",
  size: "half",
  errorList: [],
  className: "",
};
