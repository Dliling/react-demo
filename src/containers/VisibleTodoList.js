import { connect } from 'react-redux';
import { editTodo } from '../actions';
import TodoList from '../components/TodoList';
import { VisibilityFilters } from '../actions';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
            break;
        case VisibilityFilters.SHOW_DONE:
            return todos.filter(t => t.done);
            break;
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.done);
            break;
        default:
            throw new Error('unknown filter');
    }
}

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
    editTodo: id => dispatch(editTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
