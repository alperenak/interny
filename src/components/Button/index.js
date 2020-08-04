import React, {Component} from 'react';
import PropTypes from 'prop-types';

/***Styles**/
import styles from './button.scss';

class Button extends Component {
    onClick = () => {
        let {disabled, onButtonClick} = this.props;
        if(!disabled)
            onButtonClick();
    };

    render() {
        let {disabled, hoverIcon, icon, iconAutoWidth, iconPosition, sizeName, text, type} = this.props;
        return (
            <button onClick={this.onClick} className={`${styles.btn} ${styles[sizeName]} ${styles[type]} ${(disabled?styles.disabled:'')}`}>
                {(icon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('left') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                    {text}
                {(icon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('right') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
            </button>
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
  sizeName: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  hoverIcon: "",
  icon: "",
  iconAutoWidth: false,
  iconPosition: "",
  sizeName: "default",
  text: "Button",
  type: "primary"
};
