import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";

/*** Components ***/
import PlainInput from "./sub-components/Input";
import Select from "./sub-components/Select";
import Checkbox from "./sub-components/Checkbox";

class Input extends Component {
    render() {
        let {type} = this.props;
        return (
            <Fragment>
                <PlainInput v-if={['text','password','number','textarea','modal'].includes(type)} {...this.props} />
                <Select v-if={type==='select'} {...this.props} />
                <Checkbox v-if={type==='checkbox'} {...this.props} />
            </Fragment>
        );
    }
}

export default Input;

Input.propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.any,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    errorList: PropTypes.array,
    externalSource: PropTypes.array,
    className: PropTypes.string
};

Input.defaultProps = {
    disabled: false,
    label: "",
    name: "",
    type: "text",
    defaultValue: "",
    placeholder: "",
    size: "",
    errorList: [],
    externalSource: [],
    className: ''
};

