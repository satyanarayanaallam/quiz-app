import React,{Component,Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom'

class QuizSummary extends Component{
    constructor(props){
        super(props);
        this.state={
            score:0,
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            correctAnswers:0,
            wrongAnswers:0,
            usedHints:0,
            usedFiftyFifty:0
        }
    }
    render(){
        const {state,score}=this.props.location;
        let stats,remarks;
        const userScore=this.state.score;
        if(userScore<=30){
            remarks="You need more practice"
        }else if(userScore<=50 && userScore>30){
            remarks="Better luck next time"
        }
        else if(userScore<=70 && userScore>50){
            remarks="Better luck next time"
        }
        else if(userScore<=84 && userScore>70){
            remarks="You did great!"
        }
        else{
            remarks="You are genius"
        }
        if(state!==undefined){
            stats=(<Fragment>
                <div >
                <span className="mdi mdi-check-circle-outline success-icon"></span>
                </div>
                <h1>Quiz has ended</h1>
                <div className="questions">
                    <h4>{remarks}</h4>
                    <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                    <span className="stat left">Total number of questions: </span>
                    <span className="right">{this.state.numberOfQuestions}</span><br/>

                    <span className="stat left">Total number of answered questions: </span>
                    <span className="right">{this.state.numberOfAnsweredQuestions}</span><br/>

                    <span className="stat left">Total number of correct answers: </span>
                    <span className="right">{this.state.correctAnswers}</span><br/>

                    <span className="stat left">Total number of wrong answers: </span>
                    <span className="right">{this.state.wrongAnswers}</span><br/>

                    <span className="stat left">Total hints used: </span>
                    <span className="right">{this.state.usedHints}</span><br/>

                    <span className="stat left">50-50 used: </span>
                    <span className="right">{this.state.usedFiftyFifty}</span><br/>
                 </div>   
                <section>
                    <ul>
                        <li className="left">
                            <Link to ="/">Back to Home</Link>
                        </li>
                        <li className="right">
                            <Link to ="/play/quiz">Play Again</Link>
                        </li>
                    </ul>
                </section>   
                </Fragment> 
                    );
        }else{
            stats=(<section><h1 className="no-stats">No stats available please take a quiz</h1>
            <ul>
            <li className="left">
                <Link to ="/">Back to Home</Link>
            </li>
            <li className="right">
                <Link to ="/play/quiz">Take a quiz</Link>
            </li>
        </ul></section>)
        }
        return(
            <Fragment>
                <Helmet><title>Quiz-App Summary</title></Helmet>
                {stats}
            </Fragment>
        )
    }
    componentDidMount(){
        const {state}=this.props.location;
        if(state){
        this.setState({
            score:(state.score/state.numberOfQuestions)*100,
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            usedHints:state.hintsUsed,
            usedFiftyFifty:state.fiftyFiftyUsed
        });
    }
    }
}

export default QuizSummary

