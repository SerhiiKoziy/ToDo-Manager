import { put, call, select, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import { getWeatherByCoordinates } from '../../api/weatherApi';

import { getEventsFirebase, postEventFirebase, deleteEvent } from '../actions-firebase/events';
import { database } from '../actions-firebase';

import { setEvents, resetCurrentEvent, loadingEvent } from './actionCreators';

import { getCurrentEvent } from './selectors';
import { getEventFormValues } from '../form/selectors';
import { getUserUid } from '../user/selectors';

import IEvent from '@typing/IEvent';
import IWeather from '@typing/IWeather';

export const EVENTS_REQUESTED = "EVENTS_REQUESTED";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

// TODO add to events
const getEventsFirebaseAction = async () => {
  return await getEventsFirebase()
    .then((res: Promise<any>) => res)
    .catch((error) => {
      console.log('error', error);
    });
};

function* requestEventsAsync() {
  try {
    yield put(loadingEvent(true));

    const getEvents = () => getEventsFirebaseAction().then((events: IEvent[]) => events);
    const eventsList: IEvent[] = yield call(getEvents);

    const eventsArray = Object.values(eventsList);

    yield put(setEvents(eventsArray));

    yield put(loadingEvent(false));
  } catch {
    console.error("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(loadingEvent(false));
  }
}

const postEventFirebaseAction = async (event: IEvent): Promise<any> => await postEventFirebase(event);

function* createEventAsync() {
  yield put(loadingEvent(true));

  try {
    const event: IEvent = yield select(getEventFormValues);
    const uid: string = yield select(getUserUid);
    const currentTime = new Date().getTime();

    const position = {
        lat: 50.4501,
        lng: 30.523400000000038,
      };

    const day = 1;

    const getWeather = () => getWeatherByCoordinates(position, day).then((res) => res);
    const weather: IWeather = yield call(getWeather);

    if (weather) {
      const preparedEvent: IEvent = {
        ...event,
        uid: uid,
        stageProces: 'ToDo',
        weather,
        position: position,
        createdAt: currentTime,
      };

      yield call(() => postEventFirebaseAction(preparedEvent));
      yield call(requestEventsAsync);
    }

    yield put(loadingEvent(false));
  } catch {
    console.error("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(loadingEvent(false));
  }
}

export async function putEventFirebase(event: IEvent, eventId: IEvent['eventId']) {
  try {
    return await database.ref(`events/${eventId}/`).update(event);
  } catch (err) {
    return Promise.reject(err);
  }
}

interface IUpdateEvent extends AnyAction {
  payload: IEvent;
}

function* updateEventAsync(action?: IUpdateEvent) {
  yield put(loadingEvent(true));

  try {
    const currentTime = new Date().getTime();
    let preparedEvent: IEvent | null = null;

    if (action) {
      const { payload: event } = action;
      preparedEvent = {...event, updatedAt: currentTime}
    } else {
      const currentEvent: IEvent = yield select(getCurrentEvent);
      const formValues: IEvent = yield select(getEventFormValues);

      preparedEvent = {...currentEvent, ...formValues, updatedAt: currentTime};
    }

    if (preparedEvent) {
      const eventId = preparedEvent.eventId;
      const updateEvent = () => putEventFirebase(preparedEvent as IEvent, eventId)
        .then((res: IEvent[]) => res)
        .catch(() => console.error('Event update'));

      yield call(updateEvent);
      yield put(resetCurrentEvent());

      yield call(requestEventsAsync);
    }

    yield put(loadingEvent(false));
  } catch {
    console.error("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(loadingEvent(false));
  }
}

export async function deleteEventFirebase(eventId: IEvent['eventId']) {
  return await deleteEvent(eventId)
    .then((res: Promise<any>) => res)
    .catch((error) => {
      console.log('error', error)
    });
}

interface IDeleteEventAsyncProps extends AnyAction {
  payload: IEvent; //TODO fix type
}

function* deleteEventAsync({ payload: { eventId } }: IDeleteEventAsyncProps) {
  yield put(loadingEvent(true));

  try {
    const deleteEvent = () => deleteEventFirebase(eventId) //TODO change name
      .then((res: IEvent[]) => res)
      .catch(() => console.error('Event update'));

    yield call(deleteEvent);
    yield call(requestEventsAsync);
    yield put(loadingEvent(false));
  } catch {
    console.error("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(loadingEvent(false));
  }
}

export default function* watcher() {
  yield takeLatest(EVENTS_REQUESTED, requestEventsAsync);
  yield takeLatest(CREATE_EVENT, createEventAsync);
  yield takeLatest(UPDATE_EVENT, updateEventAsync);
  yield takeLatest(DELETE_EVENT, deleteEventAsync);
}
