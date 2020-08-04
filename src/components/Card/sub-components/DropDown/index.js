import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
                <div className={styles.dropDownHeader}>{title}</div>
                <ul
                    className={styles.dropDownWrapper}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    {externalData.map(el => {
                            return <li
                                key={el.key}
                                onClick={() => this.onClickListItem(el.key)}
                                className={`${el.selected ? styles.selected: ''}`}
                            >
                                <div>{el.value}</div>
                                <img v-if={el.icon} className={styles.icon} src={el.icon}/>
                            </li>
                        })
                    }
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
  header: ''
};
