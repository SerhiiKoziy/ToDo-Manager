import React, {Component, PropTypes} from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    render(){
        return(
          <div id={id}

               className={'task'}
               onClick={typeof onClick === 'function' ? onClick : false}>
              <h4>{title}</h4>
          </div>
        )
    }
};

export default Task;
