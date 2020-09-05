import React from 'react';
// import { Link } from 'react-router';
// import SimpleMap from "./GoogleMap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

import './task.scss';

interface ITaskProps {
  currentTask: any;
  onDelete: () => void;
  parentWr?: any;
}

const Task = ({ currentTask, onDelete, parentWr }: ITaskProps) => {
  const weather = currentTask && currentTask.weather;
  const cloudImageUrl = weather && `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  const renderWeather = () => {
    const weather = currentTask.weather;

    return weather && Object.keys(weather).map(key => {
      if (key !== 'weather' && key !== 'temp') {
        return (
          <div key={key}>
            <span>{key} :</span>
            <span>{weather[key]}</span>
          </div>
        );
      }

      return null;
    });
  };

  // const renderMap = (currentTask: any) => {
  //   return (
  //     <SimpleMap
  //       key={JSON.stringify(currentTask.position)}
  //       position={currentTask.position}
  //     />
  //   );
  // };

  return (
    <div
      className={`task ${currentTask.stageProces} ${parentWr}`}
      id={currentTask.id}
    >
      <div className="task-content">
        <div className="task-main-info">
          <h4>Title: {currentTask.title}</h4>
          <p>Desc: {currentTask.description}</p>
          <p className="date-task">{`${currentTask.date}`}</p>
          <p className="namePlace-task">{`${currentTask.address}`}</p>
          <p className="temp-list-title">
            <FontAwesomeIcon icon={faTemperatureLow} /> Temperature celsius:
          </p>
          {
            weather && (
              <ul className="temp-list">
                <li>Day: {`${weather.temp.day}`}</li>
                <li>Evening: {`${weather.temp.eve}`}</li>
                <li>Morning: {`${weather.temp.morn}`}</li>
                <li>Night: {`${weather.temp.night}`}</li>
              </ul>
            )
          }
        </div>
        <div className="task-secondary-info">
          {renderWeather()}
        </div>

        <div className="weather-indicator">
          <img src={cloudImageUrl} alt="" />
        </div>
      </div>

      {/*{*/}
      {/*  currentTask && (parentWr !== 'onBoard-task') && (*/}
      {/*      React.cloneElement(renderMap(currentTask), {*/}
      {/*      image: cloudImageUrl,*/}
      {/*    })*/}
      {/*  )*/}
      {/*}*/}

      {/*<div className="controls">*/}
      {/*  <div className="control control-view">*/}
      {/*    <Link to={`/task/${currentTask.eventId}`}>*/}
      {/*      <i className="fa fa-eye" aria-hidden="true" />*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*  <div className="control control-edit">*/}
      {/*    <Link to={`/task/${currentTask.eventId}/edit`}>*/}
      {/*      <i className="fa fa-pencil-square-o" aria-hidden="true" />*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*  <div className="control control-delete">*/}
      {/*    <div*/}
      {/*      className="deleteButton"*/}
      {/*      onClick={onDelete}*/}
      {/*    >*/}
      {/*      <i className="fa fa-trash" aria-hidden="true" />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Task;
