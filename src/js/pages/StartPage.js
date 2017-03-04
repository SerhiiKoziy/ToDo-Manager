import React, { Component } from 'react';
import * as actions from '../actions';
import { Task } from '../components/Task/Task';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import CreateTask from '../components/Task/CreateTask';



const mapStateToProps = (state) => {
  return { data: state.elements, columns: state.columns };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  static propTypes = {
  };

  weather(){
    this.props.getWatherToCoor();
  }


  /*componentWillUnmount() {
    this.unobserve();
  }*/



  render() {
    let arrList = this.props.data;
    return (
      <div className={`page start-page columns`}>
        <h3>New list</h3>
        <div className="inside-wr">
          <div className="lists-wr">
            <div className="list first-list">
              {
                arrList.map((item, i)=>{
                  return (
                  <div id={i}
                       key={i}
                       className={`task ${item.type}`}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <p className="date-task">{`${item.date}`}</p>
                    <p className="namePlace-task">{`${item.namePlace}`}</p>
                  </div>



                  )
                })
              }
              {/*<Task
               key={item.id}
               title={item.title}
               />*/}
            </div>
            <div className="list second-list">

            </div>
            <div className="list third-list">

            </div>
          </div>

            <div className="builder-task">


                <CreateTask></CreateTask>


            </div>
        </div>
      </div>

    );
  }
}
