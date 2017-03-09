import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ imageUrl }) => <div className="markerMap">
  <img src={imageUrl} alt="" />
</div>;

export default class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 10,
  };

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          defaultCenter={this.props.position}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={this.props.position.lat}
            lng={this.props.position.lng}
            imageUrl={this.props.image}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
