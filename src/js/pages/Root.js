import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="root">
        <header>
          <nav>
            <ul>
              <li><Link to="/">DashBoard</Link></li>
              {/*<li><Link to="task">task</Link></li>*/}
            </ul>
          </nav>
        </header>

        <div className="route-wr">
          {this.props.children}
        </div>

      </div>
    );
  }
}
// <NavBar />
