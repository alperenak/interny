import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

/***Styles**/
import styles from './button.scss';

class Button extends Component {
    onClick = () => {
        let {disabled, onButtonClick} = this.props;
        if(!disabled)
            onButtonClick();
    };

    renderContent() {
        let {disabled, hoverIcon, icon, iconAutoWidth, iconPosition, text} = this.props;
        return (
            <Fragment>
                {(icon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('left') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {text}
                {(icon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('right') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
            </Fragment>
        );
    }

    render() {
        let {disabled, to, onButtonClick, width, sizeName, type} = this.props;
        return (
            <Fragment>
                <Link style={{width: width}} v-if={to} to={to} className={`${styles.btn} ${styles[sizeName]} ${styles[type]} ${(disabled?styles.disabled:'')}`}>
                    {this.renderContent()}
                </Link>
                <button style={{width: width}} v-if={!to} onClick={onButtonClick} className={`${styles.btn} ${styles[sizeName]} ${styles[type]} ${(disabled?styles.disabled:'')}`}>
                    {this.renderContent()}
                </button>
            </Fragment>
        );
    }
}

export default Button;

Button.propTypes = {
  disabled: PropTypes.bool,
  hoverIcon: PropTypes.string,
  icon: PropTypes.string,
  iconAutoWidth: PropTypes.bool,
  iconPosition: PropTypes.string,
  onButtonClick: PropTypes.any,
  to: PropTypes.string,
  sizeName: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  hoverIcon: "",
  icon: "",
  iconAutoWidth: false,
  iconPosition: "",
  sizeName: "default",
  text: "Button",
  type: "primary",
};
