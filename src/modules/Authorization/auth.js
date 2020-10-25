import React, { Component } from 'react';
import { auth } from 'firebase/app';

import Login from './Login';
import Registration from './Registration';

import styles from './styles.module.scss';

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
            <Registration />
          ) : (
            <Login
              phase={this.state.phase}
            />
          )
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

export default Authorization;
