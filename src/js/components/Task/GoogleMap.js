import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export default class SimpleMap extends React.PureComponent {
  static propTypes = {
    position: React.PropTypes.shape({
      lat: React.PropTypes.number,
      lng: React.PropTypes.number,
    }).isRequired,
    zoom: React.PropTypes.number,
  }

  static defaultProps = {
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
