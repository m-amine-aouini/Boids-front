import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginAction } from '../../actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onchange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.loginAction(this.state);
    }
    render() {
        return !this.props.auth.openedAcc ? ( // if openedAcc is found redirect to landing page if it's not found display login component
            <div id="login-comp">
                <form>
                    <TextField maxLength={250} onChange={this.onchange.bind(this)} type="email" label="Email" name="email"/><br></br><br></br>
                    <TextField maxLength={250} onChange={this.onchange.bind(this)} type="password" label="Password" name="password"/><br></br><br></br>
                    <button id="login-btn" onClick={e => this.onSubmit(e)}>Log In</button>
                </form>
                <Link id="register-link" style={{ marginLeft: "45%" }} to="/register">Register</Link>
            </div>
        ) : (<Redirect to="/"></Redirect>)
    }
}

let mapPropsToState = state => ({ // retreive redux's state(s)
    auth: state.auth // set this.props.auth to redux's auth state
})

export default connect(mapPropsToState, { loginAction })(Login); // run mapPropsToState functionality to Login page and give it loginAction
