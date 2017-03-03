import React from 'react';


const Task = ({ id, onClick, title, description, date, type }) => (
    <div id={id}

        className={`btn btn--${type}`}
        onClick={typeof onClick === 'function' ? onClick : false}
    >
        <h4>{`${title}`}</h4>
        <p>{description}</p>
        <p className="date-task">{`${date}`}</p>
    </div>
);

Task.propTypes = {
    type: React.PropTypes.string,
    //onClick: React.PropTypes.func,
};

Task.defaultProps = {
    type: 'make',
};

export default Task;
