import React from 'react';
import { render} from 'react-dom';
import WheelPicker from '../../src';

import './demo.css'

class App extends React.Component {

    constructor(){
        super()

        this.state = {
            pickerOpen: false,
            data: ["Intro to Data Science", "Big Data", "Design and Analysis of Algorithms", "Operating Systems", "Cloud Computing", "Principles of Database Systems"],
            defaultSelection: 3,
            selection: "Big Data",
        }
    }

    render(){
        return (
            <React.Fragment>
            <div className="selected" onClick={() => this.setState({ pickerOpen: !this.state.pickerOpen})}>{this.state.selection}</div>
            {this.state.pickerOpen &&
                <div className="demo-container">
                <WheelPicker
                    data={this.state.data}
                    height={50}
                    fontSize={13}
                    defaultSelection={this.state.defaultSelection}
                    parentHeight={250}
                    updateSelection={selectedIndex => this.setState({ selection: this.state.data[selectedIndex], defaultSelection: selectedIndex })}
                    scrollerId="scroll-select-subject"
                />
                </div>
            }
            
            </React.Fragment>
        )
    }
    
}

render(<App />, document.getElementById("root"));