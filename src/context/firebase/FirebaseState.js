import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { ADD_TASK, DEL_TASK, FETCH_TASKS, SHOW_LOADER } from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = (({children}) => {
    const initialState = {
        tasks: [],
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchTasks = async () => {
        showLoader()
        const res = await axios.get(`${url}/tasks.json`)
        const payload = Object.keys(res.data).map(key => ({...res.data[key], id: key}))
        console.log(payload)
        dispatch({type: FETCH_TASKS, payload})
    }

    const addTask = async desc => {
        const task = {
            desc, date: new Date().toJSON()
        }
        try {
            const res = await axios.post(`${url}/tasks.json`, task)
            const payload = {
                ...task,
                id: res.data.name
            }
            dispatch({type: ADD_TASK, payload})
        } catch (error) {
            throw new Error(error.message)
        }
        
    }

    const delTask = async id => {
        await axios.delete(`${url}/tasks/${id}.json`)
        dispatch({
            type: DEL_TASK,
            payload: id
        })
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, fetchTasks, addTask, delTask,
            loading: state.loading,
            tasks: state.tasks
        }}>
            {children}
        </FirebaseContext.Provider>
    )
})