import React, {Component} from 'react';

/*** Components ***/
import Card from "../../components/Card";

class Login extends Component {
    render() {
        return (
            <Card
                type={'login'}
                {...this.props}
            />
        );
    }
}

export default Login;