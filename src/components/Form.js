import React, {useState, useContext} from 'react'
import { AlertContext } from '../context/alert/alertContext'
import { FirebaseContext } from '../context/firebase/firebaseContext'

export const Form = () => {
    const [desc, setDesc] = useState('')
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = e => {
        e.preventDefault()
        alert.show(desc, 'success')

        if (desc.trim()) {
            firebase.addTask(desc.trim())
            .then(() => {
                alert.show('New task has been added!', 'success')
                setDesc('')
            })
            .catch((err) => {
                alert.show('Database error!', 'danger')
            })
        } else {
            alert.show('Please enter task description!')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Task info"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
            </div>
        </form>
    )
}
