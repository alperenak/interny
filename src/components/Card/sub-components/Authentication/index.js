import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

/*** Components ***/
import Button from "../../../Button";

/*** Styles ***/
import styles from './authentication.scss';
import Input from "../../../Input";

/*** Icons ***/
import loginImage from '../../../../assets/login.png';

/*** Utils ***/
import store from '../../../../store'
import {setCookie} from "../../../../utils/cookie";

class Authentication extends Component {
    state = {
        page: 'Intern',
        submitObject: {},
        buttons: [
            {
                disabled: false,
                sizeName: 'default',
                text: this.props.type === 'auth' ? 'Create Account' : 'Login',
                loading: false,
                type: 'secondary',
                onButtonClick: async () => {
                    this.setState(state => {
                        state.buttons.map(btn => {btn.loading = true; return btn;});
                        return state;
                    });
                    if (this.props.type === 'auth') {
                        await store.internSignUp(this.state.submitObject);
                    } else {
                        let res = await store.internLogin(this.state.submitObject);
                        if (res && res.data.token) {
                            if (res.status) {
                                setCookie("token", res.data.token, {});
                                setCookie("user", this.state.page.toLowerCase(), {});
                                setCookie("user_id", res.data.id, {});
                                window.location.pathname = `/`;
                            }
                        } else {
                            this.props.createModal({ header: res.data.title, declaration: res.data.message });
                        }
                    }
                }
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
                sizeName: 'half',
                onChange: (value) => this.setState({submitObject: {...this.state.submitObject, email: value}})
            },
            {
                label: "Password",
                placeholder: "Enter password",
                errorList: [],
                type: 'password',
                sizeName: 'half',
                onChange: (value) => this.setState({submitObject: {...this.state.submitObject, password: value}})
            },
            {
                disabled: false,
                sizeName: 'small',
                text: 'Forgot your password?',
                type: 'link',
            }
        ],
        authInputs: [
            {
                label: "Name",
                placeholder: "Enter name",
                errorList: [],
                type: 'text',
                sizeName: 'half',
                value: '',
                onChange: (value) => this.setState({submitObject: {...this.state.submitObject, name: value}})
            },
            {
                label: "Surname",
                placeholder: "Enter surname",
                errorList: [],
                type: 'text',
                sizeName: 'half',
                value: '',
                onChange: (value) => this.setState({submitObject: {...this.state.submitObject, surname: value}})
            },
            {
                label: "E-mail addrees",
                placeholder: "Enter e-mail address",
                errorList: [],
                type: 'text',
                sizeName: 'half',
                value: '',
                onChange: (value) => this.setState({submitObject: {...this.state.submitObject, email: value}})
            },
            {
                label: "Password",
                placeholder: "Enter password",
                errorList: [],
                type: 'password',
                sizeName: 'half',
                value: '',
                onChange: (value) => this.setState({submitObject: {...this.state.submitObject, password: value}})
            },
            {
                label: "By joining you agree to the Terms, Privacy and Policy",
                type: 'checkbox',
                sizeName: 'full',
            }
        ],
    };

    onSwitchPage = (page) => {
        this.setState({page: page, submitObject: {}});
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
                <div v-if={type === 'auth'} v-for={(btn, i) in authButtons} key={'authBtn'+i} className={styles.authButtonContainer}>
                    <div className={styles.authButton}>
                        {btn.text}
                    </div>
                </div>
                {type === 'login' ? loginInputs.map((inp, i) => {
                    if (inp.type === 'link') {
                        return <div key={i} className={styles.inputsContainer}>
                            <Button
                                className={`${styles.inputsContainer}`}
                                type={inp.type}
                                disabled={inp.disabled}
                                sizeName={inp.sizeName}
                                text={inp.text}
                            />
                        </div>
                    }
                    return <Input
                        className={`${styles.inputsContainer}`}
                        v-if={inp.type !== 'link'}
                        sizeName={inp.sizeName}
                        key={i}
                        label={inp.label}
                        placeholder={inp.placeholder}
                        errorList={inp.errorList}
                        type={inp.type}
                        onChange={inp.onChange}
                    />
                }) :
                    authInputs.map((inp, i) => {
                        return <Input
                            className={`${styles.inputsContainer}`}
                            v-if={inp.type !== 'link'}
                            sizeName={inp.sizeName}
                            key={i}
                            label={inp.label}
                            placeholder={inp.placeholder}
                            errorList={inp.errorList}
                            type={inp.type}
                            onChange={inp.onChange}
                        />
                    })
                }
                <div className={styles.saveButtonContainer}>
                    <Button
                        v-for={(btn, i) in buttons}
                        key={'btn'+i}
                        type={btn.type}
                        disabled={btn.disabled}
                        sizeName={btn.sizeName}
                        loading={btn.loading}
                        text={btn.text}
                        width={'50px'}
                        onButtonClick={btn.onButtonClick}
                    />
                </div>
                <div v-for={(btn, i) in authButtons} key={'loginBtn'+i} v-if={type === 'login'} className={styles.authButtonContainer}>
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
