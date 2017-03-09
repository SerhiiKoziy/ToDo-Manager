﻿import React, {Component} from 'react';
import {deleteTaskInList} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux'
import SimpleMap from '../components/Task/GoogleMap';
import Task from '../components/Task/Task';


const mapStateToProps = (state, ownProps) => {
    return {currentTask: state.elements.find(task => task.id == ownProps.params.taskId)};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

@connect(mapStateToProps, {deleteTaskInList, push})
export default class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    static propTypes = {};


    deleteTask() {
        this.props.deleteTaskInList(this.props.currentTask.id)
    }

    renderWeather() {
        const weather = this.props.currentTask.weather;
        return Object.keys(weather).map(key => {
            if (key !== 'weather' && key !== 'temp') {
                return (
                    <div key={key}>
                        <span>{key} :</span>
                        <span>{weather[key]}</span>
                    </div>
                );
            }
        })
        //return null;
    }

    renderMap() {
        return <SimpleMap key={JSON.stringify(this.props.currentTask.position)}
                          position={this.props.currentTask.position}/>;
    }

    render() {
        if(this.props.currentTask){
            return (
                <div className={`page task-page`}>
                    <div className="inside-wr">
                        <div className="task-wr">
                            <div className="task-header">
                                <Link to="/">
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                    <span>Back to board</span>
                                </Link>
                            </div>
                            <Task item={this.props.currentTask}
                                  onDelete={this.deleteTask}
                                  map={this.renderMap()}
                                  weather={this.props.currentTask.weather }>
                                {this.renderWeather()}
                            </Task>

                        </div>
                        {this.props.children}
                    </div>

                </div>

            );
        }

        return null;
    }
}
