import React from 'react';

const Marker = ({ imageUrl }) => {
  return (
    <div className="markerMap">
      <img src={imageUrl} alt="" />
    </div>
  );
};

Marker.propTypes = {
  imageUrl: React.PropTypes.string,
};

export default Marker;
