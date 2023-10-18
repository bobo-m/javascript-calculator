import { Component } from "react";
import './Buttons.css';

class Buttons extends Component{
    componentDidMount(){
        const buttons = document.querySelectorAll('button');
        for(const button of buttons){
            button.addEventListener("click", this.props.handleClick);
        }
    }
    render(){
        return(
            <div className="button-container">
                <button id="clear" className="function">AC</button>
                <button id="delete" className="function">DEL</button>  
                <button id="divide" className="operator">/</button>
                <button id="one" className="number">1</button>
                <button id="two" className="number">2</button>
                <button id="three" className="number">3</button>
                <button id="multiply" className="operator">*</button>
                <button id="four" className="number">4</button>
                <button id="five" className="number">5</button>
                <button id="six" className="number">6</button>
                <button id="add" className="operator">+</button>
                <button id="seven" className="number">7</button>
                <button id="eight" className="number">8</button>
                <button id="nine" className="number">9</button>
                <button id="subtract" className="operator">-</button>
                <button id="zero" className="number">0</button>
                <button id="decimal" className="number">.</button>
                <button id="equals" className="operator">=</button>
            </div>        
        );
    }
}

export default Buttons;