import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from "./dropdown.scss";

class DropDown extends Component {
    state = {
        externalData: this.props.externalData
    };

    onClickListItem = (key) => {
        let { onChange, value } = this.props;

        let tempSource = this.state.externalData.map(el => {el.selected = (key === el.key); return el;});
        let tempSelectedItem = tempSource.find(el => el.selected);
        this.setState({externalData: [...tempSource], selectedValue: tempSelectedItem});

        onChange && onChange(value, tempSelectedItem);
    };

    render() {
        let {externalData, title} = this.props;
        return (
            <>
                <div v-if={title} className={styles.dropDownHeader}>{title}</div>
                <ul
                    className={styles.dropDownWrapper}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    {externalData.map(el => {
                        return <Link
                            key={el.key}
                            onClick={() => !el.disabled && this.onClickListItem(el.key)}
                            className={`${el.selected ? styles.selected: ''}`}
                            to={el.to}
                        >
                            <div>{el.value}</div>
                            <div v-if={el.icon} className={styles.icon}>
                                <img src={el.icon} alt={'icon'}/>
                            </div>
                        </Link>
                    })}
                </ul>
            </>
        );
    }
}

export default DropDown;

DropDown.propTypes = {
  externalData: PropTypes.array,
  title: PropTypes.string
};

DropDown.defaultProps = {
  externalData: [],
};
