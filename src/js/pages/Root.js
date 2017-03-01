import React, { Component } from 'react';


export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="root">
        <div className="route-wr">
          {this.props.children}
        </div>

      </div>
    );
  }
}
// <NavBar />
