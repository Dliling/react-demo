let nextTodoId = 0;

export const addTodo = (text) => ({
    id: nextTodoId++,
    type: 'ADD_TODO',
    text
})

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const editTodo = (id) => ({
    type: 'EDIT_TODO',
    id
})

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_DONE: 'SHOW_DONE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}
