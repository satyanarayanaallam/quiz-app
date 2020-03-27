import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'
// npm install --save-dev @iconify/react @iconify/icons-mdi
//import { Icon } from '@iconify/react';
//import cubeOutline from '@iconify/icons-mdi/cube-outline';


const Home = () => {
    return (
        <Fragment>
            <Helmet><title>Quiz-App Home</title></Helmet>
            <div id="home">
                <section>
                    <div style={{textAlign:'center'}}>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <i className="material-icons question">question_answer</i>
                    </div>
                    <h1>Quiz App</h1>
                    <div className="play-button-container">
                        <ul>
                            <li><Link  className="play-button" to="/play/instructions">Play</Link></li>
                        </ul>
                    </div>
                    <div className="auth-container">

                        <Link to="/login" className="auth-buttons" id="login-button">Login</Link>
                        <Link to="/register" className="auth-buttons" id="register-button">Register</Link>

                    </div>
                </section>
            </div>
        </Fragment>
    )
}

export default Home