import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*** Styles ***/
import styles from "./dropdown.scss";

class DropDown extends Component {
  state = {
    externalData: this.props.externalData,
  };

  onClickListItem = (key) => {
    let { value } = this.props;

    let tempSource = this.state.externalData.map((el) => {
      el.selected = key === el.key;
      return el;
    });
    let tempSelectedItem = tempSource.find((el) => el.selected);
    this.setState({
      externalData: [...tempSource],
      selectedValue: tempSelectedItem,
    });

    tempSelectedItem.onChange &&
      tempSelectedItem.onChange(value, tempSelectedItem);
  };

  render() {
    let { externalData, title, onPress } = this.props;
    return (
      <>
        <div v-if={title} className={"dropDownHeader"}>
          {title}
        </div>
        <ul
          className={"dropDownWrapper"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onPress() ? onPress() : false;
          }}
        >
          {externalData.length > 0 ? (
            externalData.map((el) => {
              return (
                <Link
                  key={el.key}
                  onClick={() => !el.disabled && this.onClickListItem(el.key)}
                  className={`${el.selected ? "selected" : ""}`}
                  to={el.to}
                >
                  <div className={"messageContainer"}>
                    <div className={"title"} v-if={el.title}>
                      {el.title}
                    </div>
                    <div>{el.value}</div>
                  </div>
                  <div
                    v-if={el.icon || el.unRead}
                    className={`${"icon"} ${el.unRead ? styles.read : ""}`}
                  >
                    <img v-if={el.icon} src={el.icon} alt={"icon"} />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className={"messageContainer"}>No Data</div>
          )}
        </ul>
      </>
    );
  }
}

export default DropDown;

DropDown.propTypes = {
  externalData: PropTypes.array,
  title: PropTypes.string,
};

DropDown.defaultProps = {
  externalData: [],
};
