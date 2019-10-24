import React from 'react'

import './index.css'

class WheelPicker extends React.Component {
    constructor(){
        super()

        this._scrollTimer =  null
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount(){
        const height = this.props.height || 40 
        var scroller = document.getElementById(this.props.scrollerId)
        scroller.addEventListener('scroll', this.handleScroll)

        // scroll to index of default selection
        var y = ((this.props.defaultSelection)*height)-1
        y = y === -1 ? 0 : y
        scroller.scroll({
            top: y,
            behavior: 'smooth'
        })


        var bottomFade = 0.66666
        var bottomShade = this.props.defaultSelection + 1
        for(var i=bottomShade; i< this.props.data.length; i++){
            document.getElementById(`${this.props.scrollerId}-scroll-item--${i}`).style.transition = `all 0.3s`
            document.getElementById(`${this.props.scrollerId}-scroll-item--${i}`).style.opacity = `${bottomFade}`
            bottomFade -= 0.33333
        }

    }

    handleScroll(e){ 
        const height = this.props.height || 40 // required to calculate which item should be selected on scroll

        //if there is already a timeout in process cancel it
        if(this._scrollTimer) clearTimeout(this._scrollTimer) 
        
        var scroll = e.srcElement.scrollTop // scroll value

        // itemInSelectorArea height of area available to scroll / height of individual item
        var itemInSelectorArea = parseInt((scroll+(height/2))/height, 10)  // add (height/2) to adjust error
        
        if(itemInSelectorArea < this.props.data.length){
            document.getElementById(`${this.props.scrollerId}-scroll-item--${itemInSelectorArea}`).classList.add('selected-time')
            
            for(var i = 0; i<this.props.data.length; i++){
                if(i !== itemInSelectorArea){
                    document.getElementById(`${this.props.scrollerId}-scroll-item--${i}`).classList.remove('selected-time')
                }
            }
        }

        function finishedScrolling(selectorAreaHeight, id, updateSelection) {
            console.log('called')
            updateSelection(itemInSelectorArea)
            var fix = document.getElementById(id)
            var y = ((itemInSelectorArea)*selectorAreaHeight)-1
            y = y === -1 ? 0 : y
            // console.log('scroll to = ', y)
            fix.scroll({
                top: y,
                behavior: 'smooth'
            })
        } 

        this._scrollTimer = setTimeout(() => finishedScrolling(height, this.props.scrollerId, this.props.updateSelection), 100)

        // color fade
        var topShade = itemInSelectorArea 
        var topFade = 1

        while(topShade >= 0){
            // console.log('shading')
            document.getElementById(`${this.props.scrollerId}-scroll-item--${topShade}`).style.transition = `all 0.3s`
            document.getElementById(`${this.props.scrollerId}-scroll-item--${topShade}`).style.opacity = `${topFade}`
            topFade -= 0.333333

            topShade--
        }

        var bottomFade = 0.66666
        var bottomShade = itemInSelectorArea + 1
        for(i=bottomShade; i< this.props.data.length; i++){
            document.getElementById(`${this.props.scrollerId}-scroll-item--${i}`).style.transition = `all 0.3s`
            document.getElementById(`${this.props.scrollerId}-scroll-item--${i}`).style.opacity = `${bottomFade}`
            bottomFade -= 0.33333
        }

    }

    renderListItems(){
        const height = this.props.height || 40
        return this.props.data.map((item, index) => {
            return index === 0 ?
            <div 
                key={item} id={`${this.props.scrollerId}-scroll-item--${index}`} className="scroll-item selected-time" style={{ minHeight: height+'px', maxHeight: height+'px', fontSize: this.props.fontSize+'px' }}
                onClick={e => document.getElementById(this.props.scrollerId).scroll({ top: 0, behavior: 'smooth'})} 
            >
                {item}
            </div>
            :
            <div key={item} id={`${this.props.scrollerId}-scroll-item--${index}`} className="scroll-item" style={{ minHeight: height+'px', maxHeight: height+'px', fontSize: this.props.fontSize+'px' }}
                onClick={e => {
                    var m = e.target.id.split('--')[1]
                    document.getElementById(this.props.scrollerId).scroll({ top: ((m)*height)-1, behavior: 'smooth'})
                }} 
            >
                {item}
            </div>
        })
    }


    render(){
        const parentHeight = this.props.parentHeight || this.props.height*this.props.data.length || this.props.data.length*40
        const height = this.props.height || 40
        console.log(parentHeight)
        return(
            <div className="scroll-select-container" style={{ height: parentHeight+"px"}}>
                <div className="scroll-selector-area" style={{ height: height+"px", top: `${(parentHeight/2)-(height/2)}px` }}></div>
                <div className="scroll-select-list" id={this.props.scrollerId} style={{ minHeight: height+"px", maxHeight: height+"px", paddingTop: `${(parentHeight/2)-(height/2)}px`,  paddingBottom: `${(parentHeight/2)-(height/2)}px`}}>
                    {this.renderListItems()}
                </div>
            </div>
        )
    }
}


export default WheelPicker