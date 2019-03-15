import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';

import { Link } from 'react-router';

import { addUserStore } from '../../actions/userStoreActions';
// import { auth } from '../../action-firebase';
// import { loadUserInfo, uploadUserInfo } from '../../action-firebase/user';
// import { transformAvatarUrl } from '../../actions/utils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import './footer.scss';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };

    // auth().onAuthStateChanged(user => {
    //   if (user) this.loadProfile();
    //   this.setState({ user, loaded: true });
    // });
  }

  // async loadProfile() {
  //   const user = auth().currentUser;
  //   const uid = user.uid;
  //   const res = await loadUserInfo(uid);
  //   const defaultName = user.displayName || this.getNameFromEmail(user.email);
  //   let signAs;
  //   let PhotoUrl;
  //
  //   const preparedUserData = {
  //     uid: user.uid,
  //     displayName: user.displayName,
  //     email: user.email,
  //     photoURL: user.photoURL,
  //   };
  //
  //   this.props.addUserStore(preparedUserData);
  //   if (res) {
  //     signAs = res.name;
  //     PhotoUrl = transformAvatarUrl(res.PhotoUrl);
  //   } else {
  //     signAs = defaultName;
  //     uploadUserInfo(preparedUserData, uid);
  //   }
  //
  //   this.setState({ name: signAs, PhotoUrl });
  // }

  render() {
    return (
      <footer className="footer">
        <div className="footer-tab">
          <Link to="/">
            <span>Main</span>
          </Link>
        </div>
        <div className="footer-tab">
          <Link to="/events">
            <span>Tasks</span>
          </Link>
        </div>
        <div className="footer-tab">
          <Link to="/profile">
            <span>Options</span>
          </Link>
        </div>
      </footer>
    );
  }
}

export default connect(
  (state) => {
    return { data: state.data, user: state.user };
  },
  { addUserStore }
)(Footer);
