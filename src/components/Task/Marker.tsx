import React from 'react';

interface IMarkerProps {
  imageUrl?: string
}

const Marker = ({ imageUrl }: IMarkerProps) => (
  <div className="markerMap">
    <img src={imageUrl} alt="" />
  </div>
);

export default Marker;
