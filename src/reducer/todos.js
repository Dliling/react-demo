// import {ADD_TODO, DEL_TODO, EDIT_TODO} from '../actions/index.js';

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
            break;
        case 'EDIT_TODO':
            return state.map(todo => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        done: !todo.done
                    })
                }
                return todo;
            })
        default:
            return state;
    }
}

export default todos;
