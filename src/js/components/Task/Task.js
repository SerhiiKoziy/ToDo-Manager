import React from 'react';

const Task = ({ type, onClick, children , title}) => (

          <div id={title}

               className={'task'}
               onClick={typeof onClick === 'function' ? onClick : false}>
              <h4>{title}</h4>
          </div>


);


Task.propTypes = {
    type: React.PropTypes.string,
    onClick: React.PropTypes.func,
    children: React.PropTypes.string,
};

Task.defaultProps = {
    type: 'default',
};
export default Task;
