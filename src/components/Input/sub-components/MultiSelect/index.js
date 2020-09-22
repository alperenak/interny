import React, { useState } from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './style.scss';
import MultipleSelect from "react-multi-select-component";


const MultiSelect = (props) => {

  const {
    externalSource,
    name, label, placeholder, size, labelDescription, errorList, disabled, className
  } = props;

  const [selected, setSelected] = useState([]);

  console.log(selected);

  return (
    <div className={`${styles.selectWrapper} ${disabled ? styles.disabled : ''} ${className}`}>
      <label v-if={label} htmlFor={name}>
        {label}
      </label>
      <div v-if={labelDescription} className={styles.labelDescription}>
        {labelDescription}
      </div>
      <MultipleSelect
        options={externalSource}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"} />
    </div>
  );

}

export default MultiSelect;


MultiSelect.propTypes = {
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  labelDescription: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.any,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  size: PropTypes.string,
  errorList: PropTypes.array,
  externalSource: PropTypes.array,
  className: PropTypes.string
};

MultiSelect.defaultProps = {
  disabled: false,
  multiple: false,
  label: "",
  name: "",
  placeholder: "placeholder",
  size: "half",
  errorList: [],
  externalSource: [],
  className: ''
};
