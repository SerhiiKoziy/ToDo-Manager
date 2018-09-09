import React from 'react';

export default class Root extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.any,
  };

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
