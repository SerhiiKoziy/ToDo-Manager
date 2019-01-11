import React from 'react';
import Login from '../components/auth/auth';
import { auth } from '../../../firebase';
import { loadUserInfo, uploadUserInfo } from '../../../firebase/user';
import { getAllEventsInfo } from '../../../firebase/events';
import {Link} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };

    auth().onAuthStateChanged(user => {
      if (user) this.loadProfile();

      this.setState({ user, loaded: true });
    });
  }

  componentDidMount() {
    getAllEventsInfo();
  }

  transformAvatarUrl(url) {
    if (url) {
      const slashPosition = url.substring(0, url.lastIndexOf('/')).lastIndexOf('/');
      const beforeFileName = url.substring(0, slashPosition);
      const afterFileName = url.substring(slashPosition, url.length);
      return `${beforeFileName}/${afterFileName}`;
    }

    return '';
  }

  async loadProfile() {
    const user = auth().currentUser;
    const uid = user.uid;
    const res = await loadUserInfo(uid);
    const defaultName = user.displayName || this.getNameFromEmail(user.email);
    let signAs;
    let PhotoUrl;

    if (res) {
      signAs = res.name;
      PhotoUrl = this.transformAvatarUrl(res.PhotoUrl);
    } else {
      signAs = defaultName;
      uploadUserInfo({ name: defaultName }, uid);
    }

    this.setState({ name: signAs, PhotoUrl });
  }

  render() {
    return (
      <div className="root">
        <header>
          <div>logo</div>
          <div>User: {this.state.name}</div>
          <div onClick={() => this.setState({ openAuth: true })}>auth</div>
        </header>

        <div className={`auth-wr ${this.state.openAuth ? 'open' : 'close'}`}>
          <div
            className="close-auth"
            onClick={() => this.setState({ openAuth: false })}
          >
            <FontAwesomeIcon icon="coffee" />
          </div>
          <Login />
        </div>
        <div className="route-wr">
          {this.props.children}
        </div>
      </div>
    );
  }
}
