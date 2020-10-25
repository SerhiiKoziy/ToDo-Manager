import React, { Component } from 'react';
import { auth } from 'firebase/app';

import LoginBlock from './LoginBlock';
import RegistrationBlock from './RegistrationBlock';

import styles from './styles.module.scss';
import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Authorization extends Component {
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

  sighOut() {
    auth().signOut();
    // this.props.deleteUserStore(); //TODO add handler
  }

  handleChangeTab = (typeSet) => {
    this.setState({ type: typeSet })
  };

  render() {
    const { type } = this.state;

    if (this.state.emailPhase === 'sendingFormData') {
      return <div className={styles.login}> {'loading...'} </div>;
    }

    return (
      <div className={styles.login}>
        {
          type === 'registration' ? (
            <RegistrationBlock />
          ) : (
            <LoginBlock
              phase={this.state.phase}
            />
          )
        }
        {
          <div className={styles.authButtons}>
            <button
              name="login-google"
              type="primary"
              onClick={() => this.loginWithGoogle()}
            >
              Log in with Google
            </button>
          </div>
        }
        <div className={styles.controlButtons}>
          <button
            className={`change-tab ${this.state.activeButton ? 'active' : ''}`}
            name="change-type"
            type="primary"
            onClick={() => this.handleChangeTab(type === 'auth' ? 'registration' : 'auth')}
          >
            { type === 'auth' ? 'Registration' : 'Authorization' }
          </button>
          <button
            className={styles.sighOut} //"sigh-out"
            name="sigh-out"
            type="primary"
            onClick={() => this.sighOut()}
          >
            {'Sign out'}
          </button>
        </div>
      </div>
    );
  }
}

export default Login
