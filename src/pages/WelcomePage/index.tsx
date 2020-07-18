﻿import React from 'react';
import { connect } from 'react-redux';

import { setList } from '../../store/actions/tasksActions';

import './styles.scss';
import {StoreState} from "../../store/reducers";

class WelcomePage extends React.PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      openAuth: false,
      PhotoUrl: '',
    };
  }

  handleAuth() {
    this.setState({ openAuth: true });
  }

  render() {
    return (
      <div className="welcome">
        <div className="route-wr">
          <span>welcome</span>
        </div>
      </div>
    );
  }
}

export default connect((state: StoreState) => ({
  data: state.data,
  user: state.user,
}), { setList })(WelcomePage);
