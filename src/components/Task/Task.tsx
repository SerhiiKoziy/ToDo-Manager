import React from 'react';
import classNames from "classnames";
// import SimpleMap from "./GoogleMap";
import Link from "../Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

import IEvent from '../../types/IEvent';

import styles from './styles.module.scss';

interface ITaskProps {
  event: IEvent;
  onDelete: () => void;
  className?: any;
}

const Task = ({ event, onDelete, className }: ITaskProps) => {
  const weather: IEvent['weather'] = event && event.weather;
  // const cloudImageUrl = weather && `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  const renderWeather = () => {
    const weather: IEvent['weather'] = event.weather;

    return weather && Object.keys(weather).map((key: any) => {
      if (key !== 'weather' && key !== 'temp') {
        return (
          <div key={key}>
            <span>{key} :</span>
            {/*<span>{weather[key]}</span>*/} //TODO temperature
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
      // className={`task ${currentTask.stageProces} ${parentWr}`}
      className={
        classNames(
          className,
          styles.task,
          // {
          //   [styles.link]: styled,
          // },
        )
      }
      // className={styles.task}
      // id={currentTask.id}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskMainInfo}>
          <h4>Title: {event.title}</h4>
          <p>Desc: {event.description}</p>
          <p>{`${event.date}`}</p>
          <p>{`${event.address}`}</p>
          <p>
            <FontAwesomeIcon icon={faTemperatureLow} /> Temperature celsius:
          </p>
          {
            weather && (
              <ul className={styles.tempList}>
                <li>Day: {`${weather.temp.day}`}</li>
                <li>Evening: {`${weather.temp.eve}`}</li>
                <li>Morning: {`${weather.temp.morn}`}</li>
                <li>Night: {`${weather.temp.night}`}</li>
              </ul>
            )
          }
        </div>
        <div className={styles.taskSecondaryInfo}>
          {renderWeather()}
        </div>

        {/*<div className={styles.weatherIndicator}>*/}
        {/*  <img src={cloudImageUrl} alt="" />*/}
        {/*</div>*/}
      </div>

      {/*{*/}
      {/*  event && (parentWr !== 'onBoard-task') && (*/}
      {/*      React.cloneElement(renderMap(event), {*/}
      {/*      image: cloudImageUrl,*/}
      {/*    })*/}
      {/*  )*/}
      {/*}*/}

      <div className={styles.controls}>
        <div className={styles.control}>
          <Link href={`/task/${event.eventId}`}>
            <i className="fa fa-eye" aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.control}>
          <Link href={`/task/${event.eventId}/edit`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true" />
          </Link>
        </div>
        <div className={classNames(styles.control, styles.controlDelete)}>
          <div
            className={styles.deleteButton}
            onClick={onDelete}
          >
            <i className="fa fa-trash" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
