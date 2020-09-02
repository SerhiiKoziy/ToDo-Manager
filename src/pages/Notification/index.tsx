import React from 'react';
import { connect } from 'react-redux';

import { setList } from '../../store/actions/tasksActions';

import './styles.scss';
import IState from "../../types/IState";

class Notification extends React.PureComponent {
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
      <div className="notification">
        <span>Notification</span>
      </div>
    );
  }
}

export default connect(
  (state: IState) => ({
    data: state.data,
    user: state.user,
  }),
  { setList }
)(Notification);
