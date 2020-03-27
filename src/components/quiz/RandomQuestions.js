import React,{Component} from 'react'
import questions from '../../../src/questions.json'

const random=Math.round(Math.random()%90);
const RandomQuestions=questions.slice(random,random+15)

export default RandomQuestions