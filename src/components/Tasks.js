import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

export const Tasks = ({tasks, onRemove}) => (
    <TransitionGroup component="ul" className="list-group">
        {tasks.map(task => (
            <CSSTransition
                key={task.id}
                classNames={'task'}
                timeout={750}
            >
                <li className="list-group-item note">   
                    <div>
                        <strong>{task.desc}</strong>
                        <small>{task.date}</small>
                    </div>
                    <button
                        type="button"
                        className="align-middle btn btn-sm btn-danger float-right"
                        onClick={() => onRemove(task.id)}
                    >
                        &times;
                    </button>
                </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
)