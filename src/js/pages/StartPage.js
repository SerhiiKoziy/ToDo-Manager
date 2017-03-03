import React, { Component } from 'react';
import { updateElement } from '../actions';
import { Task } from '../components/Task/Task';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';



const mapStateToProps = (state) => {
  return { data: state.elements, columns: state.columns };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateElement }, dispatch);
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




  /*componentWillUnmount() {
    this.unobserve();
  }*/



  render() {
    let columns = 3;
    let arrList = this.props.data;
    return (
      <div className={`page start-page columns-${columns}`}>
        <h3>New list</h3>
        <div className="inside-wr">
          <div className="lists-wr">
            <div className="list first-list">
              {
                arrList.map((item)=>{
                  return (
                      <div id={item.id}
                           key={item.id}
                           className={`task ${item.type}`}
                           onClick={typeof onClick === 'function' ? onClick : false}>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <p className="date-task">{`${item.date}`}</p>
                      </div>
                  )
                })
              }

            </div>
            <div className="list second-list">

            </div>
            <div className="list third-list">

            </div>
          </div>

            <div className="builder-task">
              <form className="">
                <div className="input-wr">
                  <p>Write title Task</p>
                  <input placeholder="title" id="" />

                </div>
              </form>
            </div>
        </div>
      </div>

    );
  }
}
