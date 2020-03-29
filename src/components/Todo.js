import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, done, text, id}) => (
    <li>
        <span
            onClick={onClick}
            style={{
                textDecoration: done ? 'line-through' : 'none'
            }}
        >
            {id + 1}.{text}
        </span>
    </li>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default Todo;
