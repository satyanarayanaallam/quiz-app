import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import answer from '../../assets/img/answer.png';
import fiftyFifty from '../../assets/img/fiftyFifty.PNG';
import hints from '../../assets/img/hints.PNG';
import options from '../../assets/img/options.PNG';

const QuizInstructions = () => {
    return (
        <Fragment>
            <Helmet><title>Quiz Instructions</title></Helmet>
            <div className="instructions container">
                <h1>How to play the game</h1>
                <p>Ensure you read this guide from start t finish.</p>
                <ul className="browser-default" id="main-list">
                    <li>The Games has a duration of 15 minutes and ends as soon as time ends.</li>
                    <li>Each game consists of 15 questions.</li>
                    <li>
                        Every question contains 4 options.
                        <img src={options} alt="Quiz app options example" />
                    </li>
                    <li>
                        Select the option that suits best by clicking it.
                        <img src={answer} alt="Quiz app answer" />
                    </li>
                    <li>
                        Each game has 2 lifelines namely:
                        <ul>
                            <li>2 50-50 choices</li>
                            <li>5 Hints</li>
                        </ul>
                    </li>
                    <li>
                        Selecting a 50-50 lifeline by clicking the instructions
                        <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                        will remove 2 wrong ansers, leaving the correct answer and one wrong answer.
                        <img src={fiftyFifty}  alt="quiz app fifty fifty example"/>
                        </li>
                        <li>
                            Using a hint by clicking the icon.
                            <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                            will remove one wrong answer leaving two wrong answers and one correct answer.
                            <img src={hints} alt="quiz app hints example"/>
                            </li>
                            <li>The timer starts as soon as the game loads.</li>
                            <li>Feel free to quit the game at any time .</li>
                </ul>
                <div>
                    <span className="left"><Link to="/">No take me to back</Link></span>
                    <span className="right"><Link to="/play/quiz">Ok, let's play</Link></span>
                    </div>
            </div>
        </Fragment>

    )
}

export default QuizInstructions