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
import {getCookie, setCookie} from "../../../../utils/cookie";

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
                onButtonClick: async () => this.onContinueClick()
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
                key: 'email',
                label: "E-mail addrees",
                placeholder: "Enter e-mail address",
                errorList: [],
                type: 'text',
                sizeName: 'half'
            },
            {
                key: 'password',
                label: "Password",
                placeholder: "Enter password",
                errorList: [],
                type: 'password',
                sizeName: 'half'
            },
            {
                disabled: false,
                sizeName: 'small',
                text: 'Forgot your password?',
                type: 'link',
                onButtonClick: () => this.props.createModal({
                    header: 'Forgot Password',
                    declaration: 'Enter your e-mail associated with the account, reset request will be emailed to the address.',
                    content: this.renderForgotPasswordContent,
                    buttons: this.renderForgotPasswordButtons()
                })
            }
        ],
        authInputs: [
            {
                key: "name",
                label: "Name",
                placeholder: "Enter name",
                errorList: [],
                type: 'text',
                sizeName: 'half',
                value: ''
            },
            {
                key: "surname",
                label: "Surname",
                placeholder: "Enter surname",
                errorList: [],
                type: 'text',
                sizeName: 'half',
                value: ''
            },
            {
                key: "email",
                label: "E-mail addrees",
                placeholder: "Enter e-mail address",
                errorList: [],
                type: 'text',
                sizeName: 'half',
                value: ''
            },
            {
                key: "password",
                label: "Password",
                placeholder: "Enter password",
                errorList: [],
                type: 'password',
                sizeName: 'half',
                value: ''
            },
            {
                label: "By joining you agree to the Terms, Privacy and Policy",
                type: 'checkbox',
                sizeName: 'full',
            }
        ],
    };

    componentDidMount() {
        this.setInputChangeMethods();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!Object.is(prevState.authInputs, this.state.authInputs)) {
            this.setInputChangeMethods();
        }
    }

    onContinueClick = async () => {
        this.setState(state => {
            state.buttons.map(btn => {btn.loading = true; return btn;});
            return state;
        });
        if (this.props.type === 'auth') {
            if (this.state.page === 'Employer') {
                await this.onCreateEmployer();
            } else
                await this.onCreateIntern();
        } else {
            await this.onLogin();
        }
    };

    onCreateIntern = async () => {
        await store.internSignUp(this.state.submitObject);
        this.setState(state => {
            state.buttons.map(btn => {btn.loading = false; return btn;});
            return state;
        });
    };

    onCreateEmployer = async () => {
        await store.employerSignUp(this.state.submitObject);
        this.setState(state => {
            state.buttons.map(btn => {btn.loading = false; return btn;});
            return state;
        });
    };

    onLogin = async () => {
        let res = {};
        if (this.props.match.params.user === 'Employer') {
            res = await store.employerLogin(this.state.submitObject);
        } else {
            res = await store.internLogin(this.state.submitObject);
        }
        if (res && res.data.token) {
            if (res.status) {
                setCookie("token", res.data.token, {});
                setCookie("user", this.props.match.params.user.toLowerCase(), {});
                setCookie("user_id", res.data.id, {});
                window.location.pathname = `/`;
            }
        } else {
            this.props.createModal({
                header: res.data.title,
                declaration: res.data.message,
                buttons: [{
                    type: 'primary',
                    text: 'OK',
                    sizeName: 'default',
                    onButtonClick: () => this.props.closeModal()
                }]
            });
            this.setState(state => {
                state.buttons.map(btn => {btn.loading = false; return btn;});
                return state;
            });
        }
    };

    onSwitchPage = (page) => {
        if (this.props.type === 'auth') {
            if (page === 'Employer') {
                this.setState(state => {
                   let name = state.authInputs.find(e => e.key === 'name');
                   let surname = state.authInputs.find(e => e.key === 'surname');
                   name.key = 'legalName'; surname.key = 'accountName';
                   name.label = 'Legal Name'; surname.label = 'Account Name';
                   name.placeholder = 'Enter Legal Name'; surname.placeholder = 'Enter Account Name';

                   return state;
                });
            } else {
                this.setState(state => {
                    let name = state.authInputs.find(e => e.key === 'legalName');
                    let surname = state.authInputs.find(e => e.key === 'accountName');
                    name.key = 'name'; surname.key = 'surname';
                    name.label = 'Name'; surname.label = 'Surname';
                    name.placeholder = 'Enter Name'; surname.placeholder = 'Enter Surname';

                    return state;
                });
            }
        }
        this.setState({page: page, submitObject: {}});
    };

    onInputChange = (key, value) => {
        this.setState({submitObject: {...this.state.submitObject, [key]: value}})
    };

    setInputChangeMethods = () => {
        this.setState(state => {
            state.loginInputs.map(e => {
                e.onChange = (value) => this.onInputChange(e.key, value);
            });
            state.authInputs.map(e => {
                e.onChange = (value) => this.onInputChange(e.key, value);
            });

            return state;
        });
    };

    renderForgotPasswordContent() {
        return (
            <Input
                type={'text'}
                label={'E-mail Address'}
                placeholder={`Enter e-mail address`}
                size={'half'}
                onChange={(value) => this.setState({value})}
            />
        );
    }

    renderForgotPasswordButtons = () => [
        {
            type: 'secondary',
            text: 'Send password',
            sizeName: 'small',
            onButtonClick: () => this.props.closeModal()
        }
    ];

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
                    <div v-if={type === 'auth'} className={styles.description}>New to Interny? Create free account</div>
                    <div v-if={type !== 'auth'} className={styles.description}>Log in Interny as {this.props.match.params.user}</div>
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
                                onButtonClick={inp.onButtonClick}
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
