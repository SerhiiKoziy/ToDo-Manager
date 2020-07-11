import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../action-firebase';
import { deleteUserStore } from '../../actions/userStoreActions';

import './auth.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhase: 'start',
      type: 'auth',
      email: '',
      password: '',
    };
  }

  loginWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    this.loginWithOtherAcc(provider);
  }

  loginWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    this.loginWithOtherAcc(provider);
  }

  async loginWithOtherAcc(provider) {
    this.setState({ emailPhase: 'sendingFormData' });
    auth().useDeviceLanguage();
    return await auth().signInWithRedirect(provider);
  }

  renderEmailBlock() {
    const phase = this.state.emailPhase;
    return phase === 'start' ?
      this.emailStart() : this.emailContinuation(phase);
  }

  emailStart() {
    return (
      <div className="enter_with_email">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleEmail();
          }}
        >
          <h3>Enter your email</h3>
          <input
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
            placeholder="email"
          />
          {/* {this.state.preloader ? <Spin /> :
          <Button name="next" type="primary" htmlType='submit'>Next</Button>}*/}
          <button name="next" type="submit">Next</button>
        </form>
      </div>
    );
  }

  async handleEmail() {
    if (!this.state.email) {
      console.log('Email field is required');
    } else {
      const res = await auth().fetchSignInMethodsForEmail(this.state.email);

      if (res && res.length === 0) {
        console.log("Invalid login email. Please, registration your profile or choose a social button.");
        this.setState({ preloader: false, activeButton: true });
      } else {
        this.setState({ emailPhase: 'using', preloader: false, activeButton: false });
      }
    }
  }

  emailContinuation(phase) {
    const cr = phase === 'creation';

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.loginWithEmail();
          }}
        >
          <h2>
            {cr ? `Account with email ${this.state.email}
            does not exist. Enter password to create new account`
            : 'Enter your password'}
          </h2>
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />
          <button
            name="login"
            type="submit"
          >
            {cr ? 'Create account and log in' : 'Log in'}
          </button>
          <a onClick={() => this.setState({ emailPhase: 'start' })}>Back</a>
          {cr ? null : <a onClick={() => this.forgotPassword()}>Forgot password ?</a>}
        </form>
      </div>
    );
  }

  async loginWithEmail() {
    // const { hide, type } = this.props
    const { email, password, type } = this.state;
    // const previousPhase = this.state.emailPhase;

    const request = () => type === 'auth' ?
      auth().signInWithEmailAndPassword(email, password) :
      auth().createUserWithEmailAndPassword(email, password);

    try {
      this.setState({ emailPhase: 'sendingFormData' });
    } catch (err) {
      console.error('Login error', err);
      // let code = err.code;
      // if (code === 'auth/wrong-password')
      //   message.error('Wrong password');
      // else if (code === 'auth/weak-password')
      //   message.error('Weak password');
      // else
      //   message.error(`Authentication error: ${code}`);
    }
  }

  async forgotPassword() {
    auth().sendPasswordResetEmail(this.state.email);
    // message.success('Email sent')
    this.setState({ refresh: Math.random() });
  }

  sighOut() {
    auth().signOut();
    this.props.deleteUserStore();
  }

  handleChangeTab(typeSet) {
    this.setState({ type: typeSet })
  }

  renderRegistrationBlock() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.loginWithEmail();
        }}
      >
        <h3>Enter your email</h3>
        <input
          type="email"
          onChange={e => this.setState({ email: e.target.value })}
          value={this.state.email}
          placeholder="email"
        />
        <h3>Enter your pass</h3>
        <input
          type="password"
          placeholder="Password"
          onChange={e => this.setState({ password: e.target.value })}
          value={this.state.password}
        />
        <button
          name="login"
          type="submit"
        >
          {"Create account and log in"}
        </button>
      </form>
    );
  }

  renderSocietyButtons() {
    return (
      <div className="auth-buttons">
        <button
          name="login-google"
          type="primary"
          onClick={() => this.loginWithGoogle()}
        >
          Log in with Google
        </button>
      </div>
    );
  }

  render() {
    const { type } = this.state;
    if (this.state.emailPhase === 'sendingFormData') {
      return <div className="login"> {'loading...'} </div>;
    }

    return (
      <div className="login">
        {type === 'registration' ? this.renderRegistrationBlock() : this.renderEmailBlock()}
        {
          (type === 'auth') && this.renderSocietyButtons()
        }
        <div className="control-buttons">
          {/*<button*/}
            {/*className={`change-tab ${this.state.activeButton ? 'active' : ''}`}*/}
            {/*name="change-type"*/}
            {/*type="primary"*/}
            {/*onClick={() => this.handleChangeTab(type === 'auth' ? 'registration' : 'auth')}*/}
          {/*>*/}
            {/*{ type === 'auth' ? 'Registration' : 'Authorization' }*/}
          {/*</button>*/}
          <button
            className="change-tab sigh-out"
            name="sigh-out"
            type="primary"
            onClick={() => this.sighOut()}
          >
            {/*<FontAwesomeIcon icon={faTemperatureLow} />*/}
            {/*<Icon icon={'google'}/>*/}
            {'Sign out'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
  { deleteUserStore }
)(Login);
