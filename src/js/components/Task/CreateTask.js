import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createTask, editTask }  from '../../actions';
import PlacesAutocomplete from 'react-places-autocomplete';
import  { geocodeByAddress } from 'react-places-autocomplete';
import {dateformat} from 'dateformat';
var dateFormat = require('dateformat');

import DatePickerExampleInline from './date';
import TextField from '../TextField/TextField';


class CreateTask extends React.Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    buttonText: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const defaultValues = {
      address: 'Kiev, Kyiv city, Ukraine',
      title: '',
      description: '',
      daysToDate: 1,
      originalDate: nextDay,
    };
    this.state = {
      values: this.props.currentTask || defaultValues,
      touched: {
        title: false,
        description: false,
      },
      errorMessages: {
        title: 'This field is required',
        description: 'This field is required',
      },
      validation: {
        title: (value) => {
          return value.length > 0;
        },
        description: (value) => {
          return value.length > 0;
        },
      },
    };


  }

  updateValue(target, value) {
    this.setState({
      values: {
        ...this.state.values,
        [target]: value,
      }
    })
  }

  createUniqueId(title, date) {
    return `${title}-${date.getTime()}`
  }

  getLocationByAdress(address) {
    return new Promise((resolve, reject) => {
      geocodeByAddress(address, (err, location) => {
        if (err) {
          reject(err);
        }
        resolve(location);
      });
    })
  }

  createTask(values) {
    const dateObject = new Date(values.originalDate);
    const date = dateFormat(dateObject, "dddd, mmmm dS");
    const day = Math.ceil(Math.abs((dateObject.getTime() - (new Date()).getTime()) / 1000 / 3600 / 24));
    const uniqueId = this.createUniqueId(values.title, dateObject);

    return {
      ...values,
      date,
      day,
      id: uniqueId,
      stageProces: "ToDo",
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const submitHandler = this.props.currentTask ? this.props.editTask : this.props.createTask;

    this.getLocationByAdress(this.state.values.address).then((position) => {
      const task = this.createTask(Object.assign({}, this.state.values, { position }));

      if (this.props.currentTask) {
        task.id = this.props.currentTask.id;
        task.stageProces = this.props.currentTask.stageProces;
      }

      submitHandler(task);
    });
  };

  changeLocation(address) {
    this.updateValue('address', address);
  }

  handleInputChange(target, e) {
    this.updateValue(target, e.target.value);
  }

  isValidForm() {
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state.values[field]);
    });
    return validations.length == 0;
  }

  handleDateChange(event, date) {
    this.updateValue('originalDate', date);
  }

  showError(target) {
    if (this.state.touched[target]) {
      if (!this.state.validation[target](this.state.values[target])) {
        return this.state.errorMessages[target];
      }
    }

    return null;
  }

  handleInputBlur(target) {
    this.setState({
      touched: {
        ...this.state.touched,
        [target]: true,
      }
    })
  }

  render() {
    return (
      <form onSubmit={::this.handleFormSubmit}>
        <div className="input-box input-wr">
          <DatePickerExampleInline
            onChange={::this.handleDateChange}
            startDate={this.state.values.originalDate}
          />
        </div>

        <TextField classNameBox={'input-wr'}
                   placeholder={'Enter title'}
                   value={this.state.values.title}
                   fieldName="title"
                   maxLength="25"
                   onChange={::this.handleInputChange}
                   onBlur={::this.handleInputBlur}
                   errorText={this.showError('title')}
        />
        <TextField classNameBox={'input-wr'}
                   placeholder={'Enter description'}
                   value={this.state.values.description}
                   fieldName="description"
                   onChange={::this.handleInputChange}
                   onBlur={::this.handleInputBlur}
                   errorText={this.showError('description')}
        />
        <div className="input-box input-wr">
          <PlacesAutocomplete
            value={this.state.values.address || ""}
            onChange={::this.changeLocation}
            placeholder="Enter deadline location adress"
          />
        </div>
        <button
          type="submit"
          className="btn btn--fw"
          disabled={!this.isValidForm()}>
          {this.props.buttonText || "Add task"}
        </button>
      </form>

    )
  }
}

export default connect(null, { createTask, editTask })(CreateTask);