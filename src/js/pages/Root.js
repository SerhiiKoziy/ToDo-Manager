import React from 'react';
import Login from '../components/auth/auth';

export default class Root extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <div className="root">
        <div>
          <span>1111</span>
          <Login />
        </div>
        <div className="route-wr">
          {this.props.children}
        </div>
      </div>
    );
  }
}
