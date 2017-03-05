import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import  { geocodeByAddress } from 'react-places-autocomplete';
import dateformat from 'dateformat';
var dateFormat = require('dateformat');

import DatePickerExampleInline from './date';
import TextField from '../TextField/TextField';


class CreateTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: 'Kiev, Kyiv city, Ukraine',
      title: this.props.title || '',
      description: "",
      daysToDate: 1,
      date: '00-00-00',
    }

  }

  createTask(newTaskParameters){

    this.props.actions.getWatherToCoor(newTaskParameters);
  }
  handleFormSubmit(event){
    event.preventDefault();
    const { address } = this.state;
    let uniqueId = Date.parse( new Date() )/1000;
    //const uniqueId = this.props.elements.length + 1;

    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) { console.log('Oh no!', err) }

      let newTaskParameters = {
        id: uniqueId,
        title: this.state.title,
        description:this.state.description,
        namePlace:address,
        position:{
          lat: lat,
          lng: lng
        },
        day: this.state.daysToDate,
        date: this.state.date
      };
      if(newTaskParameters.title.length > 0){
        this.createTask(newTaskParameters);
      }


     // console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    })

  };
  changeLocation(address){
    this.setState({ address })
  }

  changeTitle(e){
    this.setState({ title: e.target.value})
  }
  changeDesc(e) {
    this.setState({ description: e.target.value})
  }
  setFechaDesde(event, date){
    let taskDate = dateFormat(date, "dddd, mmmm dS");
    let curDate = Date.parse(new Date());
    let daysToDate = Math.ceil((Date.parse(date) - curDate) / 1000 / 3600 / 24);

    this.setState({daysToDate: daysToDate, date: taskDate});
    //console.log( dateFormat(date, "dddd, mmmm dS"));
  }
  render() {

    return (
      <form onSubmit={::this.handleFormSubmit}>
        <div className="input-wr">
          <DatePickerExampleInline
            onChange={::this.setFechaDesde}
          />
        </div>

        <TextField classNameBox={'input-wr'}
                   placeholder = {'Write title Task'}
                   onChange={this.changeTitle.bind(this)}
        />
        <TextField classNameBox={'input-wr'}
                   placeholder = {'Write description Task'}
                   value={'ddd'}
                   onChange={this.changeDesc.bind(this)}
        />
        <div className="input-wr">
          <PlacesAutocomplete
            value={this.state.address}
            onChange={::this.changeLocation}
          />
        </div>
        <button type="submit">Add task</button>
      </form>

    )
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(state => state, mapDispatch)(CreateTask);