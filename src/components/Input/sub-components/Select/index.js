import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*** Styles ***/
import styles from './select.scss';

/*** Icons ***/
import selectIcon from '../../../../icons/selectbox.svg';
import searchIcon from '../../../../icons/search.svg';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOpened: false,
            externalSource: [...this.props.externalSource],
            value: '',
            selectedValue: this.props.defaultValue,
            selectedValues: this.props.multiple ? (this.props.defaultValue ? this.props.defaultValue : []) : []
        };
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState(state => {
                state.externalSource = this.props.multiple ?
                    this.props.externalSource.map(el => { el.selected = this.state.selectedValues.some(vl => vl.key === el.key); return el; }) :
                    this.props.externalSource.map(el => { el.selected = this.state.selectedValue.key === el.key; return el; });

                state.dropDownOpened = false;

                return state;
            });
        }
    };

    onChange = (event) => {
        let { multiple } = this.props;
        this.setState({ value: event.target.value });
        if (event.target.value) {
            let tempSource = this.props.externalSource.filter(el => el.value.toLowerCase().includes(event.target.value.toLowerCase()));
            if (multiple)
                tempSource.map(el => {
                    el.selected = this.state.selectedValues.some(vl => vl.key === el.key); return el;
                });
            else
                tempSource.map(el => { el.selected = (this.state.selectedValue.key === el.key); return el; });
            this.setState({ externalSource: [...tempSource] });
        } else {
            let tempSource = this.props.externalSource;
            if (multiple)
                tempSource.map(el => {
                    el.selected = this.state.selectedValues.some(vl => vl.key === el.key); return el;
                });
            else
                tempSource.map(el => { el.selected = (this.state.selectedValue.key === el.key); return el; });
            this.setState({ externalSource: [...tempSource] });
        }
    };

    onClickInput = () => {
        if (!this.props.disabled) {
            this.setState(state => {
                state.externalSource = this.props.multiple ?
                    this.props.externalSource.map(el => { el.selected = this.state.selectedValues.some(vl => vl.key === el.key); return el; }) :
                    this.props.externalSource.map(el => { el.selected = this.state.selectedValue.key === el.key; return el; });

                state.dropDownOpened = !state.dropDownOpened;

                return state;
            });
        }
    };

    onClickListItem = (key) => {
        let { onChange, value, multiple } = this.props;

        if (multiple) {
            let tempSource = this.state.externalSource.map(el => { el.selected = key === el.key ? !el.selected : el.selected; return el; });
            let tempSelectedItems = tempSource.filter(el => el.selected);
            this.setState({ externalSource: [...tempSource], selectedValues: tempSelectedItems });
            onChange(value, tempSelectedItems);
        }
        else {
            let tempSource = this.state.externalSource.map(el => { el.selected = (key === el.key); return el; });
            let tempSelectedItem = tempSource.find(el => el.selected);
            this.setState({ externalSource: [...tempSource], selectedValue: tempSelectedItem });
            onChange(value, tempSelectedItem);
        }
    };

    render() {
        let { name, label, placeholder, size, labelDescription, errorList, disabled, className,selectedValueId } = this.props;
        let { dropDownOpened, selectedValue, selectedValues, value, externalSource } = this.state;
        return (
            <div ref={this.wrapperRef} onClick={this.onClickInput} className={`${"selectWrapper"} ${disabled ? "disabled" : ''} ${className}`}>
                <label v-if={label} htmlFor={name}>
                    {label}
                </label>
                <div v-if={labelDescription} className={"labelDescription"}>
                    {labelDescription}
                </div>
                <div className={`
                    ${"inputContainer"}
                    ${dropDownOpened ? "focus" : ''}
                    ${size} ${errorList.length > 0 ? "error" : ''}
                `}>
                    <div
                        v-if={selectedValues.length > 0}
                        className={`${"inputSelf"}`}
                    >{selectedValues.map((vl, i) => i < selectedValues.length - 1 ? vl.value + ', ' : vl.value)}</div>
                    <div
                        id={selectedValueId ? selectedValueId : null}
                        v-else-if={selectedValue.value?.length > 0}
                        className={`${"inputSelf"}`}
                    >{selectedValue.value}</div>
                    <div
                        v-else
                        className={`${"inputPlaceholder"}`}
                    >{placeholder}</div>
                    <img src={selectIcon} alt={'selectIcon'} />
                </div>
                <ul
                    v-if={dropDownOpened}
                    className={"dropDown"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <div className={"searchWrapper"}>
                        <img src={searchIcon} alt={'searchIcon'} />
                        <input
                            autoComplete={'off'}
                            className={"searchDropDown"}
                            autoFocus={true}
                            type={'text'}
                            disabled={false}
                            onChange={(e) => this.onChange(e)}
                            value={value}
                            placeholder={'Search'}
                        />
                    </div>
                    {externalSource.length ? externalSource.map(el => {
                        return <li
                            key={el.key}
                            onClick={() => this.onClickListItem(el.key)}
                            className={`${el.selected ? "selected" : ''}`}
                        >
                            {el.value}
                        </li>
                    })
                        :
                        <li>No results found...</li>
                    }
                </ul>
            </div>
        );
    }
}

export default Select;

Select.propTypes = {
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    label: PropTypes.string,
    labelDescription: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.any,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.any,
    size: PropTypes.string,
    errorList: PropTypes.array,
    externalSource: PropTypes.array,
    className: PropTypes.string
};

Select.defaultProps = {
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
