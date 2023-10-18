import { Component } from "react";
import './Output.css';

class Output extends Component{
    render(){
        return(
            <div id="output">
                {this.props.formula}
                <div id="display">{this.props.output}</div>
            </div>
        );
    }
}

export default Output;