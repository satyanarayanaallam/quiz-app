import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import questions from '../../../src/questions.json'
//import RandomQuestions from '../quiz/RandomQuestions'
import isEmpty from '../../utils/is-empty';
import M from 'materialize-css';
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3'
import buttonSound from '../../assets/audio/button-sound.mp3'

class Play extends Component {
    constructor() {
        super();
        console.log("hai babji");
        const random=Math.round(Math.random()*90);
        console.log(random);
        const RandomQuestions=questions.slice(random,random+15)
        this.state = {
            questions:RandomQuestions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberofAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled:false,
            previousButtonDisabled:true,
            previousRandomNumbers:[],
            time: {}
        };
        this.interval=null;
    }
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions:questions.length,
                answer,
                previousRandomNumbers:[]
            },()=>{
                this.showOptions();
                this.handleDisableButton();
            })
        }
    }
    componentDidMount() {
      
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    handleOptionClick=(e)=>{
        if(e.target.id===this.state.answer){
            setTimeout(() => {
                document.getElementById("correct-sound").play();
            }, 500);
            this.correctAnswer();
        }else{
            setTimeout(() => {
                document.getElementById("wrong-sound").play();
            }, 500);
            this.wrongAnswer();
        }
    }

    correctAnswer=()=>{
        M.toast({
            html:'Correct Answer',
            classes:'toast-valid',
            displayLength:1500
        });
        this.setState(prevState=>({
            score:prevState.score+1,
            correctAnswers:prevState.correctAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberofAnsweredQuestions:prevState.numberofAnsweredQuestions+1
        }),()=>{
            if(this.state.nextQuestion===undefined){
                this.endGame();
            }else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }
        });
    }

    wrongAnswer=()=>{
        //navigator.vibrate(1000)
        const conent='Wrong Answer the correct answer is '+this.state.currentQuestion.answer;
        M.toast({
            html:conent,
            classes:'toast-invalid',
            displayLength:1500
        });
        this.setState(prevState=>({
            wrongAnswers:prevState.wrongAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberofAnsweredQuestions:prevState.numberofAnsweredQuestions+1
        }),()=>{
            if(this.state.nextQuestion===undefined){
                this.endGame();
            }else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }
            
        });
    }

    handlePreviousButtonClick=()=>{
        if(this.state.previousQuestion!=undefined){
            this.setState(prevState=>({
                currentQuestionIndex:prevState.currentQuestionIndex-1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            })
        }
    }

    handleNextButtonClick=()=>{
        if(this.state.nextQuestion!=undefined){
            this.setState(prevState=>({
                currentQuestionIndex:prevState.currentQuestionIndex+1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            })
        }
    }

    handleQuitButtonClick=()=>{
        if(window.confirm("Are you sure you want to quit")){
            this.props.history.push('/')
        }
    }

    handleButtonClick=(event)=>{
        this.playButtonSound();
        switch(event.target.id){
            case "previous-button":
                this.handlePreviousButtonClick();
                break;
            case "next-button":
                this.handleNextButtonClick();
                break;
            case "quit-button":
                this.handleQuitButtonClick();
                break;
            default :
                break;            
        }
    }

    playButtonSound=()=>{
        document.getElementById("button-sound").play();
    }
    handleHints=()=>{
        //console.log("kdfkhsk");
        if(this.state.hints>0){
        const options=Array.from(document.querySelectorAll('.option'));
        let indexAnswer;
        options.forEach((option,index)=>{
            if(option.id===this.state.answer){
                indexAnswer=index;
            }
        });
        while(true){
            const randomNumber=Math.round(Math.random()*3);
            if(randomNumber!==indexAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                options.forEach((option,index)=>{
                    if(index===randomNumber){
                        option.style.visibility='hidden';
                        this.setState((prevState)=>({
                            hints:prevState.hints-1,
                            previousRandomNumbers:prevState.previousRandomNumbers.concat(randomNumber)
                        }));
                    }
                });
                break;
            }
            if(this.state.previousRandomNumbers.length>=3) break;
        }
    }
       
    }
    showOptions=()=>{
        const options=Array.from(document.querySelectorAll('.option'))
        options.forEach((option)=>{
         option.style.visibility='visible';
        })
        this.setState({
            usedFiftyFifty:false
        })
    }

    handleFiftyFifty=()=>{
        if(this.state.fiftyFifty>0 && this.state.usedFiftyFifty===false){
        const options=Array.from(document.querySelectorAll('.option'));
        const randomNumbers=[];
        let indexOfAnswer;
        options.forEach((option,index)=>{
            if(option.id===this.state.answer){
                indexOfAnswer=index;
            }
        })
        let count=0;
        do{
            const randomNumber=Math.round(Math.random()*3);
            if(randomNumber!==indexOfAnswer){
                if(randomNumbers.length<2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                    randomNumbers.push(randomNumber);
                    count++;
                }else{
                    while(true){
                        const newRandomNumber=Math.round(Math.random()*3);
                        if(!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer) ){
                            randomNumbers.push(newRandomNumber);
                            count++;
                            break;
                        }
                    }
                }
            }
        }while(count<2)
        options.forEach((option,index)=>{
            if(randomNumbers.includes(index)){
                option.style.visibility='hidden';
            }
        });
        this.setState(prevState=>({
            fiftyFifty:prevState.fiftyFifty-1,
            usedFiftyFifty:true
        }));
    }
    }
    
    startTimer=()=>{
        const countDownTime=Date.now()+1800000;
        this.interval=setInterval(()=>{
            const now=new Date();
            const distance=countDownTime-now;
            const minutes=Math.floor((distance%(1000*60*60))/(1000*60))
            const seconds=Math.floor((distance%(1000*60))/(1000))
            if(distance<0){
                clearInterval(this.interval);
                this.setState({
                    time:{
                        minutes:0,
                        seconds:0
                    }
                },()=>{
                    this.endGame();
                    alert('Quiz has ended');
                    this.props.history.push('/')
                })
            }else{
                this.setState({
                    time:{
                        minutes,
                        seconds
                    }
                })
            }
        },1000)
    }
    handleDisableButton=()=>{
        if(this.state.previousQuestion===undefined || this.state.currentQuestionIndex===0){
            this.setState({
                previousButtonDisabled:true
            })
        }else{
            this.setState({
                previousButtonDisabled:false
            })
        }
        if(this.state.nextQuestion===undefined || this.state.currentQuestionIndex+1===this.state.numberOfQuestions){
            this.setState({
                nextButtonDisabled:true
            })
        }else{
            this.setState({
                nextButtonDisabled:false
            })
        }
    }
    endGame=()=>{
        alert('Quiz has ended');
        const {state}=this;
        const playerStats={
            score:state.score,
            numberOfQuestions:state.numberOfQuestions,
            numberofAnsweredQuestions:state.correctAnswers+state.wrongAnswers,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            fiftyFiftyUsed:2-state.fiftyFifty,
            hintsUsed:5-state.hints
        };
        console.log(playerStats);
        setTimeout(()=>{
            this.props.history.push('/play/summary',playerStats)
        },1000)
    }
    render() {
        const { currentQuestion,currentQuestionIndex,numberOfQuestions,hints,fiftyFifty,time } = this.state;
        return (
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <Fragment>
                    <audio id="button-sound" src={buttonSound}/>
                    <audio id="correct-sound" src={correctNotification}/>
                    <audio id="wrong-sound" src={wrongNotification}/>
                </Fragment>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="lifeline-container">
                        <p>
                            <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
                              <span className="lifeline">{fiftyFifty}</span>
                        </p>
                        <p>
                            <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span>
                             <span className="lifeline">{hints}</span>
                        </p>
                    </div>
                    <div className="timer-container">
                        <p>
                            <span className="left" style={{ float: 'left' }}>{currentQuestionIndex+1} of {numberOfQuestions}</span>
                            <span className="right">{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option" id="optionA">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option" id="optionB">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option" id="optionC">{currentQuestion.optionC}</p>
                        <p  onClick={this.handleOptionClick} className="option" id="optionD">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button
                         className={this.state.previousButtonDisabled?'disable':''}   
                         id="previous-button"
                          onClick={this.handleButtonClick}
                          >Previous</button>
                        <button id="next-button" onClick={this.handleButtonClick}
                        className={this.state.nextButtonDisabled?'disable':''}   >Next</button>
                        <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Play