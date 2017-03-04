import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import  { geocodeByAddress } from 'react-places-autocomplete';


import DatePickerExampleInline from './date';
import TextField from '../TextField/TextField';


class CreateTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: 'Kiev, Kyiv city, Ukraine',
      title:'',
      description: ""
    }

  }

  sendTask(newTask){
    this.props.actions.getWatherToCoor(newTask);
  }
  handleFormSubmit(event){
    event.preventDefault()
    const { address } = this.state

    geocodeByAddress(address,  (err, { lat, lng }) => {
      if (err) { console.log('Oh no!', err) }

      let newTask = {
        title: this.state.title,
        description:this.state.description,
        namePlace:address,
        position:{
          lat: lat,
          lng: lng
        },
        day:10
      };
      if(newTask.title.length > 0){
        this.sendTask(newTask)
        //this.sendTask(newTask)
      }


      console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
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
  changeDate(e){
    console.log(e)
  }
  setFechaDesde(x,event){
  let curDate = Date.parse(new Date());
  let dayBeforeDate = Math.ceil((Date.parse(event) - curDate) / 1000 / 3600 / 24);
  console.log( dayBeforeDate);
}
  render() {

    return (
      <form onSubmit={::this.handleFormSubmit}>
        <div className="input-wr">
          <DatePickerExampleInline
            onClick={::this.changeDate.bind(this)}
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