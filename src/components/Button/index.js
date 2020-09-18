import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

/*** Styles ***/
import styles from './button.scss';

/*** Icons **/
import loadingIcon from '../../icons/loading.svg';

class Button extends Component {
    onClick = () => {
        let {disabled, onButtonClick} = this.props;
        if(!disabled)
            onButtonClick();
    };

    renderContent() {
        let {disabled, hoverIcon, loading, icon, iconAutoWidth, iconPosition, text} = this.props;
        return (
            <Fragment>
                {(icon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && hoverIcon && iconPosition.includes('left') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && !hoverIcon && iconPosition.includes('left')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                <img hidden={!loading} src={loadingIcon} alt={'loading'} />
                {(icon && iconPosition.includes('center')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && hoverIcon && iconPosition.includes('center') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && !hoverIcon && iconPosition.includes('center')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {!loading && text}
                {(icon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && hoverIcon && iconPosition.includes('right') && !disabled) && <img src={hoverIcon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
                {(icon && !hoverIcon && iconPosition.includes('right')) && <img src={icon} alt="" className={`${styles[iconPosition+'-icon']} ${styles.hoverIcon} ${(iconAutoWidth?styles.autoWidth:'')}`} />}
            </Fragment>
        );
    }
    responsiveConverter(responsive){
        if(responsive==='post'){
            return styles.responsivePost
        }
        else if (responsive === 'auth'){
            return styles.responsiveAuth
        }
        else if (responsive === 'link'){
            return styles.responsiveLink
        }
        else if (responsive === 'hamburger'){
            return styles.responsiveHamburger
        }
        else return ''
    }

    render() {
        let {disabled, to, onButtonClick, loading, width, sizeName, type, onMouseOver, onMouseLeave,responsive} = this.props;
        return (
            <Fragment>
                <Link onClick={onButtonClick} style={{width: width}} v-if={to} to={to} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
                    className={`${styles.btn} ${loading ? styles.loading : ''} ${styles[sizeName]} ${styles[type]} ${this.responsiveConverter(responsive)} ${(disabled?styles.disabled:'')}`}>
                    {this.renderContent()}
                </Link>
                <button style={{width: width}} v-if={!to} onClick={onButtonClick} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
                    className={`${styles.btn} ${loading ? styles.loading : ''} ${styles[sizeName]} ${styles[type]} ${this.responsiveConverter(responsive)} ${(disabled?styles.disabled:'')}`}>
                    {this.renderContent()}
                </button>
            </Fragment>
        );
    }
}

export default Button;

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  hoverIcon: PropTypes.string,
  icon: PropTypes.string,
  iconAutoWidth: PropTypes.bool,
  iconPosition: PropTypes.string,
  onButtonClick: PropTypes.func,
  to: PropTypes.string,
  sizeName: PropTypes.string,
  responsive:PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  hoverIcon: "",
  icon: "",
  iconAutoWidth: false,
  iconPosition: "",
  sizeName: "default",
  type: "primary",
  responsive:"",
};
