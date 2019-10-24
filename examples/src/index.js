import React from 'react';
import { render} from 'react-dom';
import WheelPicker from '../../src';

import './demo.css'

class App extends React.Component {

    constructor(){
        super()

        this.state = {
            pickerOpen: false,
            data: ["Intro to Data Science", "Big Data", "Design and Analysis of Algorithms", "Operating Systems"],
            defaultSelection: 3,
            selection: '',
        }
    }

    render(){
        return (
            <div className="demo-container">
                <WheelPicker
                    data={this.state.data}
                    height={40}
                    fontSize={13}
                    defaultSelection={3}
                    parentHeight={250}
                    updateSelection={selectedIndex => this.setState({ selection: this.state.data[selectedIndex] })}
                    scrollerId="scroll-select-min"
                />
            </div>
        )
    }
    
}

render(<App />, document.getElementById("root"));