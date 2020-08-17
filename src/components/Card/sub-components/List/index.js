import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from "./list.scss";

class List extends Component {
    state = {
        externalData: this.props.externalData
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.externalData.length <= 0 && this.props.externalData.length > 0) {
            this.setState({ externalData: this.props.externalData })
        } else if (this.state.externalData > 0) {
            if (this.state.externalData[0].key !== this.props.externalData[0].key) {
                this.setState({ externalData: this.props.externalData })
            }
        }
    }

    onClickListItem = (key) => {
        let { value } = this.props;

        let tempSource = this.props.externalData.map(el => {el.selected = (key === el.key); return el;});
        let tempSelectedItem = tempSource.find(el => el.selected);
        this.setState({externalData: [...tempSource], selectedValue: tempSelectedItem});

        tempSelectedItem.onChange && tempSelectedItem.onChange(value, tempSelectedItem);
    };

    render() {
        let {externalData, title} = this.props;
        return (
            <>
                <div v-if={title} className={styles.listHeader}>{title}</div>
                <ul
                    className={styles.listWrapper}
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

export default List;

List.propTypes = {
  externalData: PropTypes.array,
  title: PropTypes.string
};

List.defaultProps = {
  externalData: [],
};
