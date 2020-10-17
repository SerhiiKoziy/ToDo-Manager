import { put, call, select, takeLatest } from "redux-saga/effects";
import { AnyAction } from 'redux';

import { startFetching, stopFetching } from "../loading/actionCreators";
import { getWeatherByCoordinates } from "../../api/weatherApi";

import { getEventsFirebase, postEventFirebase, deleteEvent } from '../action-firebase/events';
import { database } from "../action-firebase";

import { setEvents, resetCurrentEvent } from './actionCreators';

import { getCurrentEvent } from './selectors';
import { getEventFormValues } from "../form/selectors";
import { getUserUid } from "../user/selectors";

import IEvent from '../../types/IEvent';
import IWeather from "../../types/IWeather";

export const EVENTS_REQUESTED = "EVENTS_REQUESTED";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

//TODO add to events
const getEventsFirebaseAction  = async () => {
  return await getEventsFirebase()
    .then((res: Promise<any>) => res)
    .catch((error) => {
      console.log('error', error)
    });
};

function* requestEventsAsync() {
  try {
    yield put(startFetching());

    const getEvents = () => getEventsFirebaseAction().then((events: IEvent[]) => events);
    const eventsList: IEvent[] = yield call(getEvents);

    const eventsArray = Object.values(eventsList);

    yield put(setEvents(eventsArray));

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

const postEventFirebaseAction = async (event: IEvent): Promise<any> => await postEventFirebase(event);

function* createEventAsync() {
  yield put(startFetching());

  try {
    const event: IEvent = yield select(getEventFormValues);
    const uid: string = yield select(getUserUid);

    const mockWeather = {
      position: {
        lat: 50.4501,
        lng: 30.523400000000038,
      },
      day: 1,
    };

    const getWeather = () => getWeatherByCoordinates(mockWeather).then((res) => res);

    const weather: IWeather = yield call(getWeather);
    console.log('weather', weather)

    if (weather) {
      const preparedEvent: IEvent = {...event, uid: uid, stageProces: 'ToDo', weather};
      yield call(() => postEventFirebaseAction(preparedEvent));
      yield call(requestEventsAsync);
    }

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export async function putEventFirebase(event: IEvent, eventId: IEvent['eventId']) {
  try {
    return await database.ref(`events/${eventId}/`).update(event);
  } catch (err) {
    return Promise.reject(err);
  }
}

function* updateEventAsync() {
  yield put(startFetching());

  try {
    const currentEvent: IEvent = yield select(getCurrentEvent);
    const formValues: IEvent = yield select(getEventFormValues);

    if (currentEvent) {
      const preparedEvent = {...currentEvent, ...formValues};
      const updateEvent = () => putEventFirebase(preparedEvent, currentEvent.eventId)
        .then((res: IEvent[]) => res)
        .catch(() => console.error('Event update'));

      yield call(updateEvent);
      yield put(resetCurrentEvent());

      yield call(requestEventsAsync);
    }

    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
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
  yield put(startFetching());

  try {
    const deleteEvent = () => deleteEventFirebase(eventId) //TODO change name
      .then((res: IEvent[]) => res)
      .catch(() => console.error('Event update'));

    yield call(deleteEvent);
    yield call(requestEventsAsync);
    yield put(stopFetching());
  } catch {
    alert("THE REQUEST HAS FAILED AND THIS IS ERROR HANDLER");
    yield put(stopFetching());
  }
}

export default function* watcher() {
  yield takeLatest(EVENTS_REQUESTED, requestEventsAsync);
  yield takeLatest(CREATE_EVENT, createEventAsync);
  yield takeLatest(UPDATE_EVENT, updateEventAsync);
  yield takeLatest(DELETE_EVENT, deleteEventAsync);
}
