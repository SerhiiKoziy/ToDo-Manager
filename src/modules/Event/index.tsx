import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
// import SimpleMap from './GoogleMap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureLow, faEye, faPencilRuler, faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from '../../components/Link';

import IEvent from '../../types/IEvent';
import IWeather from '../../types/IWeather';
import IWeatherTemp from '../../types/IWeatherTemp';

import styles from './styles.module.scss';

interface IEventProps {
  event: IEvent;
  onDelete: () => void;
  onEditEvent: (eventId: string) => void;
  className?: string;
}

export const Event = ({ event, onDelete, onEditEvent, className }: IEventProps) => {
  const { temp, weather }: IWeather = event && event.weather;
  const { description, main, icon }: IWeatherTemp = weather[0];
  const cloudImageUrl = `http://openweathermap.org/img/w/${icon}.png`;

  return (
    <div className={classNames(className, styles.event)}>
      <div className={styles.eventContent}>
        <div className={styles.eventMainInfo}>

          <h4>Title: {event.title}</h4>
          <p>Desc: {event.description}</p>
          <p>{`${moment(event.date).format('LL')}`}</p>
          {/*<p>{`${event.address}`}</p>*/}

          <p className={styles.temperatureTitle}>
            <FontAwesomeIcon icon={faTemperatureLow} />
            <span> Temperature celsius:</span>
          </p>

          {
            temp && (
              <ul className={styles.tempList}>
                <li className={styles.temp}>Day: {`${temp.day}`}</li>
                <li className={styles.temp}>Evening: {`${temp.eve}`}</li>
                <li className={styles.temp}>Morning: {`${temp.morn}`}</li>
                <li className={styles.temp}>Night: {`${temp.night}`}</li>
              </ul>
            )
          }
        </div>
        <div className={styles.eventSecondaryInfo}>
          <p>Second info:</p>
          {
            weather[0] && (
              <ul className={styles.tempList}>
                <li>Description: { description }</li>
                <li>Main: { main }</li>
              </ul>
            )
          }
        </div>

        <div className={styles.weatherIndicator}>
          <img src={cloudImageUrl} alt='' />
        </div>
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
