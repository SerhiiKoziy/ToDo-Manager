import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

interface ISimpleMapProps {
  image?: string;
  position: any;
  zoom?: number;
}

const SimpleMap = ({ image, position, zoom = 10 }: ISimpleMapProps) => {;

  return (
    <div className="map">
      <GoogleMapReact
        defaultCenter={position}
        defaultZoom={zoom}
      >
        <Marker imageUrl={image}/>
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;
