import React, { Component } from 'react';
import { auth, initUser } from '../../../../firebase';
// import { Button, Input, message, Spin, Form } from 'antd'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailPhase: 'start',
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
          {/* {this.state.preloader ? <Spin /> : <Button name="next" type="primary" htmlType='submit'>Next</Button>}*/}
        </form>
      </div>
    );
  }

  // async handleEmail() {
  //   if (!this.state.email)
  //     message.error('Email field is required')
  //   else {
  //     var res = await auth().fetchSignInMethodsForEmail(this.state.email)
  //     var phase = res && res.length === 0 ? "creation" : "using"
  //     this.setState({ emailPhase: phase, preloader: false })
  //   }
  // }

  // emailContinuation(phase) {
  //   var cr = phase === 'creation'
  //   return <div>
  //     <Form
  //       onSubmit={(e) => {
  //         e.preventDefault()
  //         this.loginWithEmail()
  //       }}
  //     >
  //       <h2>{cr ? `Account with email ${this.state.email} does not exist. Enter password to create new account` :
  // "Enter your password"}</h2>
  //       <Input
  //         type="password"
  //         placeholder="Password"
  //         onChange={e => this.setState({ password: e.target.value })}
  //         value={this.state.password}
  //       />
  //       <Button
  //         name="login"
  //         type="primary"
  //         htmlType='submit'
  //       >
  //         {cr ? "Create account and log in" : "Log in"}
  //       </Button>
  //       <a onClick={() => this.setState({ emailPhase: 'start' })}>Back</a>
  //       {cr ? null : <a onClick={() => this.forgotPassword()}>Forgot password ?</a>}
  //     </Form>
  //   </div>
  // }

  // async loginWithEmail() {
  //   var hide = this.props.hide
  //   var { email, password } = this.state
  //   var previousPhase = this.state.emailPhase
  //   var creation = previousPhase === 'creation'
  //   var request = () => creation ?
  //     auth().createUserWithEmailAndPassword(email, password) :
  //     auth().signInWithEmailAndPassword(email, password)
  //
  //   try {
  //     this.setState({ emailPhase: 'sendingFormData' })
  //     let result = await request()
  //     if (result.user) await initUser(result.user)
  //
  //     if (hide) hide()
  //   }
  //   catch (err) {
  //     console.error('loginWithEmail error', err)
  //     let code = err.code
  //     if (code === 'auth/wrong-password')
  //       message.error('Wrong password')
  //     else if (code === 'auth/weak-password')
  //       message.error('Weak password')
  //     else
  //       message.error(`Authentication error: ${code}`)
  //
  //     this.setState({ emailPhase: previousPhase })
  //   }
  // }

  // async forgotPassword(){
  //   auth().sendPasswordResetEmail(this.state.email)
  //   message.success('Email sent')
  //   this.setState({refresh: Math.random()})
  // }

  render() {
    if (this.state.emailPhase === 'sendingFormData') {
      return <div className="login"> preloader </div>;
    }

    return (
      <div className="login">
        {this.renderEmailBlock()}
        <div className="auth-buttons">
          <button
            name="login-google"
            type="primary"
            onClick={() => this.loginWithGoogle()}
          >
            Log in with Google
          </button>
          <button
            name="login-facebook"
            type="primary"
            onClick={() => this.loginWithFacebook()}
          >
            Log in with Facebook
          </button>
        </div>

        <button onClick={() => auth().signOut()}>Sign out</button>
      </div>
    );
  }
}

export default Login;
