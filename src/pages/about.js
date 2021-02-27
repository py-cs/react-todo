import React from "react"
import { NavLink } from "react-router-dom"

export const About = () => {
    return (
        <div className="card">
            <h5 className="card-header">About</h5>
            <div className="card-body">
                <h5 className="card-title">To-do app</h5>
                <p className="card-text">React to-do app. Version 1.0</p>
                <NavLink
                    className="btn btn-primary"
                    to="/"
                >
                    Back to Home page
                </NavLink>
            </div>
        </div>
    )
}