import React from 'react';
import { Link } from 'react-router';

const Task = ({ item, onDelete, weather, children, map }) => {
  const cloudImageUrl = `http://openweathermap.org/img/w/${item.weather.weather[0].icon}.png`;
  let currentWeather = weather || null;



  return (
    <div
      className={`task ${item.stageProces}`}
      id={item.id}
    >
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <p className="date-task">{`${item.date}`}</p>
      <p className="namePlace-task">{`${item.address}`}</p>
      <div className="weather-indicator">
        <img src={cloudImageUrl} alt=""/>
      </div>

      {map && React.cloneElement(map, {
        image: cloudImageUrl,
      })}

      {children}
      <div className="controls">
        <div className="control control-view">
          <Link to={`/task/${item.id}`}>
            <i className="fa fa-eye" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="control control-edit">
          <Link to={`/task/${item.id}/edit`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
        </div>
        <div className="control control-delete">
          <div className="deleteButton"
               onClick={onDelete}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>

      </div>
    </div>);
};


Task.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

Task.defaultProps = {
  type: 'default',
};
export default Task;
