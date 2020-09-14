import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
// import dateFormat from 'dateformat';

import DatePicker from "../../../components/DatePicker";

import TextField from '../../../components/TextField';
import { TASK_FORM } from '../../../configs/forms';

import ITask from "../../../types/ITask";

import moment from 'moment';

import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";

import styles from './styles.module.scss';

interface ICreateTaskProps {
  user: any;
  currentTask: ITask;
  buttonText: string;
  createTaskAction: () => void;
  editTaskAction: () => void;
}

const CreateTask = ({ user, currentTask, buttonText, createTaskAction, editTaskAction }: ICreateTaskProps) => {
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

  const userUID = user && user.uid && user.uid.length > 0;
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  return (
    <form
      // onSubmit={handleFormSubmit}
      className={styles.formWrapper}
    >
      <Field
        name="date"
        type="text"
        className={'input-wr'}
        component={DatePicker}
        placeholder={"Choose event's date"}
        label={"Choose event's date"}
        // validate={[required]}
        fullWidth
        // disabled={!editable}
      />

      <Field
        name="title"
        type="text"
        className={'input-wr'}
        component={TextField}
        placeholder={'Enter title'}
        label={'Enter event name'}
        // validate={[required]}
        fullWidth
        // disabled={!editable}
      />

      <Field
        name="description"
        type="text"
        className={'input-wr'}
        component={TextField}
        placeholder={'Enter description'}
        label={'Add description'}
        // validate={[required]}
        fullWidth
        // disabled={!editable}
      />
      {/*<Field*/}
      {/*  name="address"*/}
      {/*  type="text"*/}
      {/*  className={'input-wr'}*/}
      {/*  component={PlacesAutocomplete}*/}
      {/*  placeholder={'Enter deadline location address'}*/}
      {/*  // label={texts.name}*/}
      {/*  // validate={[required]}*/}
      {/*  fullWidth*/}
      {/*  // disabled={!editable}*/}
      {/*/>*/}
      {/*<div className="input-box input-wr">*/}
      {/*  <PlacesAutocomplete*/}
      {/*    value={this.state.values.address || ''}*/}
      {/*    onChange={this.changeLocation}*/}
      {/*    onBlur={this.handleInputBlur}*/}
      {/*    placeholder="Enter deadline location address"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<TextField*/}
      {/*  classNameBox={'input-wr'}*/}
      {/*  placeholder={'Enter description'}*/}
      {/*  value={this.state.values.description}*/}
      {/*  fieldName="description"*/}
      {/*  onChange={this.handleInputChange}*/}
      {/*  onBlur={this.handleInputBlur}*/}
      {/*  errorText={this.showError('description')}*/}
      {/*/>*/}

      <button
        type="submit"
        className="btn btn--fw"
        // disabled={!this.isValidForm() || !userUID}
      >
        {buttonText || 'Add event'}
      </button>
      {
        !userUID && (
          <p className="submit-message">Login, please!</p>
        )
      }
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm<any, any>({
    form: TASK_FORM,
    enableReinitialize: true,
  })(CreateTask));
