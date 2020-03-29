import React from 'react';
import {connect} from 'react-redux';
import {addTodo} from '../actions';

const AddTodo = ({dispatch}) => {
    let input;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(addTodo(input.value))
                input.value = ''
            }}>
                <div className="form-group clearfix">
                    <h4 htmlFor="listInput">Add Todo</h4>
                    <input ref={node => input = node} type="text" className="form-control pull-left todo-input" id="listItemInput" placeholder="Add New ToDo"/>
                    <button className="btn btn-primary pull-left" type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}
// const Input = ({value, onChange, onSubmit}) => {
//     return (
//         <form onSubmit={onSubmit}>
//             <div className="form-group clearfix">
//                 <h4 htmlFor="listInput">Add Todo</h4>
//                 <input type="text" className="form-control pull-left todo-input" id="listItemInput" placeholder="Add New ToDo" onChange={onChange} value={value}/>
//                 <button className="btn btn-primary pull-left">Add</button>
//             </div>
//         </form>
//     )
// }

// export default Input;
export default connect()(AddTodo);
