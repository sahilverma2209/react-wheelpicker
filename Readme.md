# react-datetime-selector
A simple Calendar and Time picker component which lets user pick Date/Time through a visual interface.

Find the [Demo here](https://sahilverma2209.github.io/react-wheelpicker/)

# Installation

```
npm install react-wheelpicker
```

# Usage

The component imported is called **WheelPicker**. 

To use the component, simply import the package on the top of the file and use **<WheelPicker />** to render


## Import it as 

```js
import WheelPicker from 'react-wheelpicker'
```

## Example:

```js
import DateOrTimeSelector from '../node_modules/react-datetime-selector/dist/index'

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
            <div className="selected" onClick={() => this.setState({ pickerOpen: !this.state.pickerOpen})}>     {this.state.selection}
            </div>
            {this.state.pickerOpen &&
                <div className="demo-container">
                <WheelPicker
                    data={this.state.data}
                    height={40}
                    parentHeight={250}
                    fontSize={13}
                    defaultSelection={this.state.defaultSelection}
                    updateSelection={selectedIndex => this.setState({ selection: this.state.data[selectedIndex], defaultSelection: selectedIndex })}
                    scrollerId="scroll-select-subject"
                />
                </div>
            }
            </React.Fragment>
        )
    }
  
}

```

# Props passed

1. **scrollerId** (String)  - COMPULSORY PROP
* This is a **unique string** which is used to identify the WheelPicker. This prop allows the user to use multiple WheelPickers on the same page/within the same component. If you use more than one WheelPicker, each of them should recieve a unique ```scrollerId``` prop. This prop is used to add a 'scroll' eventlistner to the parent div.

2. **data** (Array)
* You'll need to pass an array of Strings. This array is used to render the picker options from which the user selects. 

3. **height** (Number)
* This is the height of a single picker option. This value is used in calculating which option is currently in the selector window. Default value = 40 

4. **parentHeight** (Number)
* This is the height of the WheelPicker list. This value is also used in calculating which option is currently in the selector window. 

* Default value = (#items in data) * height. Therefore, if the number of items in the ```data``` prop is 10 and ```height``` of each item is 50px, then parentHeight = 10*50 = 500px

* Ideal value <= (#items in data) * height

5. **defaultSelection** (Number)
* This is the **index** of the element that should be selected by default when the WheelPicker is rendered.

6. **updateSelection** (Function)
* This function recieves the ```selected index``` and can be used to update the state of the component that renders the WheelPicker. Using this selected index and the data array, we can see which option the user has selected


7. **fontSize** (Number)
* This is the font size of every element in the list

