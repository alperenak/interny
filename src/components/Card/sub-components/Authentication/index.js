import React, {Component} from 'react';

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from './authentication.scss';
import Input from "../../../Input";

/*** Icons ***/
import loginImage from '../../../../assets/login.png';

class Authentication extends Component {
    state = {
        page: 'Intern',
        buttons: [
            {
                disabled: false,
                sizeName: 'default',
                text: this.props.type === 'auth' ? 'Create Account' : 'Login',
                type: 'secondary'
            }
        ],
        authButtons: [
            {
                text: 'Log in with Google+',
            },
            {
                text: 'Log in with Facebook',
            }
        ],
        loginInputs: [
            {
                label: "E-mail addrees",
                placeholder: "Enter e-mail address",
                errorList: [],
                type: 'text',
                sizeName: 'half'
            },
            {
                label: "Password",
                placeholder: "Enter password",
                errorList: [],
                type: 'password',
                sizeName: 'half'
            },
            {
                label: "Remember me",
                type: 'checkbox',
                sizeName: 'full'
            }
        ],
        authInputs: [
            {
                label: "Name",
                placeholder: "Enter name",
                errorList: [],
                type: 'text',
                sizeName: 'half'
            },
            {
                label: "Surname",
                placeholder: "Enter surname",
                errorList: [],
                type: 'text',
                sizeName: 'half'
            },
            {
                label: "E-mail addrees",
                placeholder: "Enter e-mail address",
                errorList: [],
                type: 'text',
                sizeName: 'half'
            },
            {
                label: "Password",
                placeholder: "Enter password",
                errorList: [],
                type: 'password',
                sizeName: 'half'
            },
            {
                label: "By joining you agree to the Terms, Privacy and Policy",
                type: 'checkbox',
                sizeName: 'full'
            }
        ],
    };

    onSwitchPage = (page) => {
        this.setState({page: page});
    };

    render() {
        let {type} = this.props;
        let {page, buttons, authButtons, authInputs, loginInputs} = this.state;
        return (
            <div className={`${styles.auth} ${type === 'login' ? styles.login : ''}`}>
                <div v-if={type === 'auth'} className={styles.switchButtons}>
                    <div
                        onClick={() => this.onSwitchPage('Intern')}
                        className={`${styles.switchButton} ${styles.internButton} ${page === 'Intern' ? styles.activeButton : ''}`}
                    >Intern</div>
                    <div
                        onClick={() => this.onSwitchPage('Employer')}
                        className={`${styles.switchButton} ${styles.employerButton} ${page === 'Employer' ? styles.activeButton : ''}`}
                    >Employer</div>
                </div>
                <div className={styles.authHeader}>
                    <div className={styles.headerText}>{type === 'auth' ? page : 'Log In'}</div>
                    <div className={styles.description}>New to Interny? Create free account</div>
                </div>
                <div v-if={type === 'auth'} v-for={btn in authButtons} className={styles.authButtonContainer}>
                    <div className={styles.authButton}>
                        {btn.text}
                    </div>
                </div>
                <Input
                    className={`${styles.inputsContainer}`}
                    v-for={inp in (type === 'login' ? loginInputs : authInputs)}
                    sizeName={inp.sizeName}
                    label={inp.label}
                    placeholder={inp.placeholder}
                    errorList={inp.errorList}
                    type={inp.type}
                />
                <div className={styles.saveButtonContainer}>
                    <Button
                        v-for={btn in buttons}
                        type={btn.type}
                        disabled={btn.disabled}
                        sizeName={btn.sizeName}
                        text={btn.text}
                    />
                </div>
                <div v-for={btn in authButtons} v-if={type === 'login'} className={styles.authButtonContainer}>
                    <div className={styles.authButton}>
                        {btn.text}
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <div className={styles.shadow}>
                        <img v-if={type === 'login'} src={loginImage} alt={"loginImage"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Authentication;
