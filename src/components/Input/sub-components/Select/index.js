import React, {Component} from 'react';
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
            selectedValue: {
                key: '',
                value:''
            }
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
            this.setState({
                dropDownOpened: false,
                externalSource: this.props.externalSource.map(el => {el.selected = (this.state.selectedValue.key === el.key); return el;}),
            });
        }
    };

    onChange = (event) => {
        let { onChange } = this.props;
        this.setState({value: event.target.value});
        if (event.target.value) {
            let tempSource = this.props.externalSource.filter(el => el.value.includes(event.target.value));
            tempSource.map(el => {el.selected = (this.state.selectedValue.key === el.key); return el;});
            this.setState({externalSource: [...tempSource]});
        } else {
            let tempSource = this.props.externalSource;
            tempSource.map(el => {el.selected = (this.state.selectedValue.key === el.key); return el;});
            this.setState({externalSource: [...tempSource]});
        }
        onChange(event.target.value, this.state.selectedValue.value);
    };

    onClickInput = () => {
        if (!this.props.disabled) {
          this.setState({
              dropDownOpened: !this.state.dropDownOpened,
              externalSource: this.props.externalSource.map(el => {el.selected = (this.state.selectedValue.key === el.key); return el;}),
          });
        }
    };

    onClickListItem = (key) => {
        let { onChange, value } = this.props;

        let tempSource = this.state.externalSource.map(el => {el.selected = (key === el.key); return el;});
        let tempSelectedItem = tempSource.find(el => el.selected);
        this.setState({externalSource: [...tempSource], selectedValue: tempSelectedItem});

        onChange(value, tempSelectedItem);
    };

    render() {
        let {name, label, placeholder, size, errorList, disabled, className} = this.props;
        let {dropDownOpened, selectedValue, value, externalSource} = this.state;
        return (
            <div ref={this.wrapperRef} onClick={this.onClickInput} className={`${styles.selectWrapper} ${disabled ? styles.disabled : ''} ${className}`}>
                <label v-if={label} htmlFor={name}>
                    {label}
                </label>
                <div className={`
                    ${styles.inputContainer} 
                    ${dropDownOpened ? styles.focus : ''} 
                    ${styles[size]} ${errorList.length > 0 ? styles.error : ''}
                `}>
                    <div
                        v-if={selectedValue.value}
                        className={`${styles.inputSelf}`}
                    >{selectedValue.value}</div>
                    <div
                        v-else
                        className={`${styles.inputPlaceholder}`}
                    >{placeholder}</div>
                    <img src={selectIcon} alt={'selectIcon'}/>
                </div>
                <ul
                    v-if={dropDownOpened}
                    className={styles.dropDown}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <div className={styles.searchWrapper}>
                        <img src={searchIcon} alt={'searchIcon'}/>
                        <input
                            autoComplete={'off'}
                            className={styles.searchDropDown}
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
                                    className={`${el.selected ? styles.selected: ''}`}
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
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.any,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    errorList: PropTypes.array,
    externalSource: PropTypes.array,
    className: PropTypes.string
};

Select.defaultProps = {
    disabled: false,
    label: "",
    name: "",
    placeholder: "placeholder",
    size: "half",
    errorList: [],
    externalSource: [],
    className: ''
};
