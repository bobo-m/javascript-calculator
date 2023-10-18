import React,{Component} from "react";
import Buttons from './components/Buttons';
import Output from "./components/Output";
import './App.css';

const isNumber = /[0-9]/;
const isOperator = /[/*\-+]/;
const endsWithOperator = /[/*\-+]$/
const endsWithNegativeSign = /\d[/*\-+]-$/;

class App extends Component{
    state={
        currVal:'0',
        prevVal: '0',
        formula: '',
        evaluated: false
    }
    maxDigitWarning=()=>{
        const{currVal} = this.state;
        this.setState({
            currVal: 'Max Digit Limit',
            prevVal: currVal
        });
        setTimeout(()=>{this.setState({currVal:this.state.prevVal})}, 1000);
    }
    handleNumbers=(val)=>{
        if(!this.state.currVal.includes('Limit')){
            this.setState({evaluated:false});
            const{currVal, formula, evaluated} = this.state;
            if(currVal.length>21){
                this.maxDigitWarning();
            }else if(evaluated){
                this.setState({
                    currVal: val,
                    formula: val !== '0' ? val : ''
                })
            }else{
                this.setState({
                    currVal:
                       currVal ==='0' || isOperator.test(currVal) ?
                       val : currVal + val,
                    formula:
                       currVal === '0' && val === '0'?
                          formula === '' ? val : currVal
                        : formula + val
                })
            }
        }
    }
    handleOperators=(val)=>{
        if(!this.state.currVal.includes('Limit')){
            const {prevVal, evaluated, formula} = this.state;
            this.setState({currVal:val, evaluated:false});
            if(evaluated){
                this.setState({
                    formula: prevVal + val 
                });
            }else if(!endsWithOperator.test(formula)){
                this.setState({
                    prevVal: formula,
                    formula: formula + val
                })
            }else if(!endsWithNegativeSign.test(formula)){
                this.setState({
                    formula: 
                       (endsWithNegativeSign.test(formula + val) ? formula : prevVal) 
                       + val                           
                });
            }else if(val !== '-'){
                this.setState({
                    formula: prevVal + val,
                });
            }
        }
    }
    handleDecimal=()=>{
        if(this.state.evaluated){
            this.setState({
                evaluated:false,
                currVal: '0.',
                formula : '0.'
            })
        }else if(
            !this.state.currVal.includes('Limit') &&
            !this.state.currVal.includes('.')
        ){
            console.log('problem');
            if(this.state.currVal.length>21){
                this.maxDigitWarning();
            }else if(endsWithOperator.test(this.state.formula)){
                this.setState({
                    currVal: '0.',
                    formula: this.state.formula + '0.'
                })
            }else{
                this.setState({
                    currVal: this.state.currVal + '.',
                    formula: this.state.formula ==='0' ? '0.' : this.state.formula + '.'
                })
            }
        }
    }
    handleEvaluate=()=>{
        if(!this.state.currVal.includes('Limit')){
            this.setState({
                evaluated:true
            });
            let expression = this.state.formula;
            while(endsWithOperator.test(expression)){
                expression = expression.slice(0,-1);
            }
            let answer = Math.round(10000000000 * eval(expression))/10000000000;
            answer = answer.toString();
            this.setState({
                currVal:answer,
                prevVal: answer,
                formula: expression + '=' + answer
            })
        }
    }
    handleDelete=()=>{
        const{formula, evaluated} = this.state;
        this.setState({evaluated: false});
        if(evaluated){
            this.setState({
                currVal: '0',
                formula: ''
            })
        }else if(endsWithOperator.test(this.state.formula)){
            const lastValue = formula.match(/\d*(\.\d+)?[/*\-+]$/);
            this.setState({
                currVal: /[/*\-+]{2}/.test(formula)? formula.slice(-2,-1) : lastValue[0].slice(0,-1),
                formula: formula.slice(0,-1),
                prevVal: /[/*\-+]{2}/.test(formula)? lastValue[0].slice(0,-2) :lastValue[0].slice(0,-1)
            })
        }else{
            const lastValue = formula.match(/\d+(\.\d+)?$/);
            this.setState({
                currVal: formula ==='0'? '0': lastValue[0].slice(0,-1),
                formula: formula.slice(0,-1),
                prevVal: formula.slice(0,-1)
            })
        }
    }
    handleClick=(event)=>{
        const val = event.target.innerHTML;
        if(isNumber.test(val)){
            this.handleNumbers(val);
        }else if(isOperator.test(val)){
            this.handleOperators(val);
        }else if(val === 'AC'){
            this.initialize();
        }else if(val === '.'){
            this.handleDecimal();
        }else if(val === '='){
            this.handleEvaluate();
        }else if(val === 'DEL'){
            this.handleDelete();
        }
    }
    
    initialize=()=>{
        this.setState({
            currVal:'0',
            prevVal: '0',
            formula: '',
            evaluated: false
        })
    }
    render(){
        return(
            <div id="calculator">
                <Output formula={this.state.formula} output={this.state.currVal}/>
                <Buttons handleClick={this.handleClick}/>
            </div>
        );
    }
}

export default App;