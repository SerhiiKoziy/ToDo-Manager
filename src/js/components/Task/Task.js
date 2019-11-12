import React from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

import './task.scss';

const Task = ({ item, onDelete, children, map }) => {
  const weatherItem = item.weather;
  const cloudImageUrl = weatherItem && `http://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png`;

  return (
    <div
      className={`task ${item.stageProces}`}
      id={item.id}
    >
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <p className="date-task">{`${item.date}`}</p>
      <p className="namePlace-task">{`${item.address}`}</p>
      <p><FontAwesomeIcon icon={faTemperatureLow} /> Temperature celsius:</p>
        {
          weatherItem && (
            <ul className="temp-list">
              <li>Day: {`${weatherItem.temp.day}`}</li>
              <li>Evening: {`${weatherItem.temp.eve}`}</li>
              <li>Morning: {`${weatherItem.temp.morn}`}</li>
              <li>Night: {`${weatherItem.temp.night}`}</li>
            </ul>
          )
        }
      <div className="weather-indicator">
        <img src={cloudImageUrl} alt="" />
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
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="control control-delete">
          <div
            className="deleteButton"
            onClick={onDelete}
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};


Task.propTypes = {
  item: React.PropTypes.object,
  children: React.PropTypes.any,
  map: React.PropTypes.any,
  onDelete: React.PropTypes.func,
};

export default Task;
