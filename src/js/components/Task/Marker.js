import React from 'react';

const Marker = ({ imageUrl }) => (
  <div className="markerMap">
    <img src={imageUrl} alt="" />
  </div>
);

Marker.propTypes = {
  imageUrl: React.PropTypes.string,
};

export default Marker;
