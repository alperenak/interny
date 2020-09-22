import React, { Component } from "react";
import ReactDOM from "react-dom";

/*** Components ***/
import Input from "../../components/Input";
import Button from "../../components/Button";

/*** Styles ***/
import styles from "./updatepassword.scss";
import store from "../../store";

class UpdatePassword extends Component {
    state = {
        value: "",
        confirmValue: "",
        processing: false,
        errorList: []
    };

    onClick = async () => {
        let {value, confirmValue} = this.state;
        let {userType, verificationKey} = this.props.match.params;

        if (value !== confirmValue) {
            this.setState(state => {
                state.errorList.push({text: 'Do not match password', valid: false});
            });
        } else {
            this.setState({ processing: true });
            await store.resetPassword(userType, value, verificationKey);
            this.setState({ processing: false });
            window.location.pathname = '/';
        }
    };

    render() {
        return ReactDOM.createPortal(
            <div className={styles.outer}>
                <div className={styles.modal}>
                    <div className={styles.header}>Update Password</div>
                    <div className={styles.description}>
                        Enter new password associated with your Interny account.
                    </div>

                    <div className={styles.input_wrapper}>
                        <Input
                            label={'New Password'}
                            type="password"
                            size={'large'}
                            placeholder="Enter new password"
                            onChange={v => this.setState({ value: v })}
                        />
                        <Input
                            label={'Confirm Password'}
                            type="password"
                            size={'large'}
                            placeholder="Enter new password"
                            onChange={v => this.setState({ confirmValue: v })}
                            errorList={this.state.errorList}
                        />
                        <div className={styles.button}>
                            <Button text={'Save Password'} type={'secondary'} onButtonClick={this.onClick} />
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById("modal")
        );
    }
}

export default UpdatePassword;
