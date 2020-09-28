import React from 'react';
import classNames from "classnames";
// import SimpleMap from "./GoogleMap";

import Link from "../../components/Link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faEye, faPencilRuler, faTrash } from '@fortawesome/free-solid-svg-icons';

import IEvent from '../../types/IEvent';
import IWeather from "../../types/IWeather";

import styles from './styles.module.scss';

interface IEventProps {
  event: IEvent;
  onDelete: () => void;
  onEditEvent: (eventId: string) => void;
  className?: string;
}

export const Event = ({ event, onDelete, onEditEvent, className }: IEventProps): any => {
  const weather: IWeather = event && event.weather;
  // const cloudImageUrl = weather && `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  const renderWeather = () => {
    const weather: IWeather = event.weather;

    return weather && Object.keys(weather).map((key: any) => {
      if (key !== 'weather' && key !== 'temp') {
        return (
          <div key={key}>
            <span>{key} :</span>
            {/*<span>{weather[key]}</span>*/}
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
            <FontAwesomeIcon icon={faEye} />
          </Link>
        </div>
        <div className={styles.control}>
          {/*<Link href={`/task/${event.eventId}/edit`}>*/}
          {/*  <FontAwesomeIcon icon={faPencilRuler} />*/}
          {/*</Link>*/}

          <div onClick={() => onEditEvent(event.eventId)}>
            <FontAwesomeIcon icon={faPencilRuler} />
          </div>
        </div>
        <div className={classNames(styles.control, styles.controlDelete)}>
          <div
            className={styles.deleteButton}
            onClick={onDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </div>
  );
};
