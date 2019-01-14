import React from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import dateFormat from 'dateformat';
import DatePicker from './DatePicker';
import TextField from '../TextField/TextField';
import { createTask, editTask } from '../../actions';

class CreateTask extends React.Component {
  static propTypes = {
    currentTask: React.PropTypes.object,
    user: React.PropTypes.object || null,
    buttonText: React.PropTypes.string,
    editTask: React.PropTypes.func,
    createTask: React.PropTypes.func,
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

    this.defaultState = {
      values: this.props.currentTask || defaultValues,
      touched: {
        title: false,
        description: false,
        address: false,
      },
      errorMessages: {
        title: 'Title is required',
        description: 'Description is required',
        address: 'Address is required',
      },
      validation: {
        title: (value) => {
          return value.length > 0;
        },
        description: (value) => {
          return value.length > 0;
        },
        address: (value) => {
          return value.length > 0;
        },
      },
    };
    this.state = this.defaultState;
  }

  updateValue(target, value) {
    this.setState({
      values: {
        ...this.state.values,
        [target]: value,
      },
    });
  }


  getLocationByAdress(address) {
    return new Promise((resolve, reject) => {
      geocodeByAddress(address, (err, location) => {
        if (err) {
          reject(err);
        }
        resolve(location);
      });
    });
  }

  createTask(values) {
    const dateObject = new Date(values.originalDate);
    const date = dateFormat(dateObject, 'dddd, mmmm dS');
    const day = Math.ceil(Math.abs((dateObject.getTime() - (new Date()).getTime()) / 1000 / 3600 / 24));
    const currentTime = new Date().getTime();

    return {
      ...values,
      date,
      day,
      id: currentTime,
      stageProces: 'ToDo',
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const userUID = this.props.user && this.props.user.uid;
    const submitHandler = this.props.currentTask ? this.props.editTask : this.props.createTask;

    this.getLocationByAdress(this.state.values.address).then((position) => {
      const task = this.createTask(Object.assign({}, this.state.values, { position }));
      task.uid = userUID;

      if (this.props.currentTask) {
        task.createdAt = this.props.currentTask.createdAt;
        task.id = this.props.currentTask.id;
        task.stageProces = this.props.currentTask.stageProces;
      }

      submitHandler(task);
      this.setState(this.defaultState);
    });
  }

  changeLocation(address) {
    this.updateValue('address', address);
  }

  handleInputChange(target, e) {
    this.updateValue(target, e.target.value);
  }

  isValidForm() {
    const address = this.state.values.address;
    const validations = Object.keys(this.state.validation).filter(field => {
      return !this.state.validation[field](this.state.values[field]);
    });
    return (validations.length === 0 && address.length > 0);
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
      },
    });
  }

  render() {
    const userUID = this.props.user && this.props.user.uid.length > 0;
    // const isWrote = this.state.title && this.state.title.length > 0;
    console.log('userUID', userUID);

    return (
      <form onSubmit={::this.handleFormSubmit}>
        <div className="input-box input-wr">
          <DatePicker
            onChange={::this.handleDateChange}
            startDate={this.state.values.originalDate}
          />
        </div>

        <TextField
          classNameBox={'input-wr'}
          placeholder={'Enter title'}
          value={this.state.values.title}
          fieldName="title"
          maxLength="25"
          onChange={::this.handleInputChange}
          onBlur={::this.handleInputBlur}
          errorText={this.showError('title')}
        />
        <TextField
          classNameBox={'input-wr'}
          placeholder={'Enter description'}
          value={this.state.values.description}
          fieldName="description"
          onChange={::this.handleInputChange}
          onBlur={::this.handleInputBlur}
          errorText={this.showError('description')}
        />
        <div className="input-box input-wr">
          <PlacesAutocomplete
            value={this.state.values.address || ''}
            onChange={::this.changeLocation}
            onBlur={::this.handleInputBlur}
            placeholder="Enter deadline location adress"
          />
        </div>
        <button
          type="submit"
          className="btn btn--fw"
          disabled={!this.isValidForm() || !userUID}
        >
          {this.props.buttonText || 'Add event'}
        </button>
        {
          !userUID && (
            <p className="submit-message">Login, please!</p>
          )
        }
      </form>
    );
  }
}

export default connect((state) => {
  return { user: state.user };
}, { createTask, editTask })(CreateTask);
