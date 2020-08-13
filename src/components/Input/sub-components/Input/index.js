import React, {Component} from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './input.scss';

class PlainInput extends Component {
    state = {
      value: ""
    };

    onChange = (event) => {
        let { onChange } = this.props;
        this.setState({value: event.target.value});
        if (onChange) onChange(event.target.value);
    };

    render() {
        let {name, label, type, disabled, icon, defaultValue, placeholder, size, errorList, className} = this.props;
        let {value} = this.state;
        return (
            <div className={`${styles.inputWrapper} ${disabled ? styles.disabled : ''} ${className}`}>
                <label v-if={label} htmlFor={name}>
                    {label}
                </label>
                <textarea
                    v-if={type === 'textarea'}
                    className={`
                        ${styles.inputContainer} 
                        ${type === 'textarea' ? styles.textarea : ''} 
                        ${styles[size]} ${errorList.length > 0 ? styles.error : ''}`
                    }
                    name={name}
                    autoComplete={'off'}
                    autoFocus={false}
                    type={type}
                    disabled={disabled}
                    onChange={(e) => this.onChange(e)}
                    defaultValue={value ? value : defaultValue}
                    placeholder={placeholder}
                />
                <div
                    v-else
                    className={`
                        ${styles.inputContainer} 
                        ${type === 'textarea' ? styles.textArea : ''} 
                        ${styles[size]} ${errorList.length > 0 ? styles.error : ''}`
                    }
                >
                    <img v-if={icon && icon.position === 'left'} src={icon.src} alt={'icon'} className={`${styles.icon} ${styles[icon.position]}`} />
                    <input
                        name={name}
                        autoComplete={'off'}
                        autoFocus={false}
                        type={type}
                        disabled={disabled}
                        onChange={(e) => this.onChange(e)}
                        defaultValue={value ? value : defaultValue}
                        placeholder={placeholder}
                    />
                    <img v-if={icon && icon.position === 'right'} src={icon.src} alt={'icon'} className={`${styles.icon} ${styles[icon.position]}`} />
                </div>
            </div>
        );
    }
}

export default PlainInput;

PlainInput.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.object,
  onChange: PropTypes.any,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  errorList: PropTypes.array,
  className: PropTypes.string
};

PlainInput.defaultProps = {
  disabled: false,
  label: "",
  name: "",
  type: "text",
  defaultValue: "",
  placeholder: "placeholder",
  size: "half",
  errorList: [],
  className: ''
};
