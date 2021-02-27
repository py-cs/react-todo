import {SHOW_LOADER, ADD_TASK, DEL_TASK, FETCH_TASKS} from '../types'

const handlers = {
    DEFAULT: state => state,
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [ADD_TASK]: (state, {payload}) => ({...state, tasks: [...state.tasks, payload]}),
    [DEL_TASK]: (state, {payload}) => ({...state, tasks: state.tasks.filter(task => task.id !== payload)}),
    [FETCH_TASKS]: (state, {payload}) => ({...state, tasks: payload, loading: false})
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}