import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import IPosition from '../../../types/IPosition';

interface ISimpleMapProps {
  image?: string;
  position: IPosition;
  zoom?: number;
}

const SimpleMap = ({ image, position, zoom = 10 }: ISimpleMapProps) => {
  return (
    <div className='map'>
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
