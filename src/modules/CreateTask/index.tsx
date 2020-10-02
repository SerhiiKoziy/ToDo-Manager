import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from 'redux-form';

import CreateTaskForm from './CreateTaskForm';

// import ITask from "../../types/ITask";

import moment from 'moment';

import { createEvent, updateEvent } from "../../store/events/actionCreators";
import { getEventFormValues } from "../../store/form/selectors";
import { getCurrentEvent } from "../../store/events/selectors";


import styles from './styles.module.scss';

interface ICreateEventProps {
  buttonText?: string;
}

const CreateTask = ({ buttonText }: ICreateEventProps) => {
  const dispatch = useDispatch();
  const values = useSelector(getEventFormValues);
  const currentEvent = useSelector(getCurrentEvent);

  // constructor(props) {
  //   super(props);
  //
  //   const nextDay = new Date();
  //   nextDay.setDate(nextDay.getDate() + 1);
  //
  //   const defaultValues = {
  //     address: 'Kiev, Kyiv city, Ukraine',
  //     title: '',
  //     description: '',
  //     daysToDate: 1,
  //     originalDate: nextDay,
  //   };
  //
  //   this.defaultState = {
  //     values: this.props.currentTask || defaultValues,
  //     touched: {
  //       originalDate: false,
  //       title: false,
  //       description: false,
  //       address: false,
  //     },
  //     errorMessages: {
  //       originalDate: 'Date is required',
  //       title: 'Title is required',
  //       description: 'Description is required',
  //       address: 'Address is required',
  //     },
  //     validation: {
  //       originalDate: (value) => {
  //         return !!value;
  //       },
  //       title: (value) => {
  //         return value && value.length > 0;
  //       },
  //       description: (value) => {
  //         return value && value.length > 0;
  //       },
  //       address: (value) => {
  //         return value && value.length > 0;
  //       },
  //     },
  //   };
  //   this.state = this.defaultState;
  //
  //   this.handleInputBlur = this.handleInputBlur.bind(this);
  //   this.handleInputChange = this.handleInputChange.bind(this);
  //   this.handleDateChange = this.handleDateChange.bind(this);
  //   this.handleFormSubmit = this.handleFormSubmit.bind(this);
  //   this.changeLocation = this.changeLocation.bind(this);
  // }

  // const updateValue = (target, value) => {
  //   this.setState({
  //     values: {
  //       ...this.state.values,
  //       [target]: value,
  //     },
  //   });
  // };

  // const getLocationByAddress = (address) => {
  //   return new Promise((resolve, reject) => {
  //     geocodeByAddress(address, (err, location) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(location);
  //     });
  //   });
  // };
  //
  // const prepareTask = (values) => {
  //   const dateObject = new Date(values.originalDate);
  //   // const date = dateFormat(dateObject, 'dddd, mmmm dS');
  //   const date = '';
  //   const day = Math.ceil(Math.abs((dateObject.getTime() - (new Date()).getTime()) / 1000 / 3600 / 24));
  //   const currentTime = new Date().getTime();
  //
  //   return {
  //     ...values,
  //     date,
  //     originalDate: values.originalDate,
  //     day,
  //     id: currentTime,
  //     stageProces: 'ToDo',
  //     createdAt: currentTime,
  //     updatedAt: currentTime,
  //   };
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //
  //   const userUID = this.props.user && this.props.user.uid;
  //   const submitHandler = this.props.isEdit ?
  //     this.props.editTaskAction : this.props.createTaskAction;
  //
  //   getLocationByAddress(this.state.values.address).then((position) => {
  //
  //     const task = prepareTask(Object.assign({}, this.state.values, { position }));
  //     task.uid = userUID;
  //
  //     if (this.props.updatedAt) {
  //       task.createdAt = this.props.currentTask.createdAt;
  //       task.id = this.props.currentTask.id;
  //       task.stageProces = this.props.currentTask.stageProces;
  //     }
  //
  //     submitHandler(task);
  //     this.setState(this.defaultState);
  //   });
  // };

  // const changeLocation = (address) => {
  //   updateValue('address', address);
  // };
  //
  // const handleInputChange = (target, e) => {
  //   updateValue(target, e.target.value);
  // };
  //
  // const isValidForm = () => {
  //   const address = this.state.values.address;
  //   const validations = Object.keys(this.state.validation).filter(field => {
  //     return !this.state.validation[field](this.state.values[field]);
  //   });
  //
  //   return (validations.length === 0 && address.length > 0);
  // };

  // const handleDateChange = (event, date) => {
  //   const dateMoment = moment(date);
  //   const datePrepared = dateMoment && dateMoment._d && dateMoment._d.toISOString();
  //
  //   updateValue('originalDate', datePrepared);
  // };
  //
  // const showError = (target) => {
  //   if (this.state.touched[target]) {
  //     if (!this.state.validation[target](this.state.values[target])) {
  //       return this.state.errorMessages[target];
  //     }
  //   }
  //
  //   return null;
  // };
  //
  // const handleInputBlur = (target) => {
  //   this.setState({
  //     touched: {
  //       ...this.state.touched,
  //       [target]: true,
  //     },
  //   });
  // };

  const publish = useCallback(
    (): void => {
      if (currentEvent) {
        dispatch(updateEvent());
      } else {
        dispatch(createEvent());
      }
    },
    [dispatch, currentEvent],
  );

  return (
    <div>
      <CreateTaskForm />
      <button
        className="btn btn--fw"
        onClick={publish}
        // disabled={!this.isValidForm() || !userUID}
      >
        {currentEvent ? 'Edit event' : 'Add event'}
      </button>
    </div>
  );
};

export default CreateTask
