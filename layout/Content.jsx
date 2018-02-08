import React from 'react';
import Element from './Element.jsx';
import withSizes from 'react-sizes'

class Content extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            data: require('../data/PeriodicTableJSON.json'),
            elWidth: Math.floor((props.winWidth - 20) / 18),
            hold: false,
            catchX: null,
            catchY: null,
            periodicLeft: null,
            periodicTop: null,
        }
        //console.log('constructed');
    }
    componentDidMount() {
        var h = this.props.winHeight - this.periodicX.offsetTop;
        this.periodicX.style.height = h + 'px';
        //console.log(this,h)
    }

    changeFilter(filt) {
        //this.state.filter = filt;
        //console.log('#' + filt)
       // this.filter = filt;
        console.log(this);
        //this.data.symbol = 'SS';
    }
    // onWheel
    wheel(event) {
        var periodic = this.periodicElement;
        var scaleX = periodic.getBoundingClientRect().width / periodic.offsetWidth;
        //console.log(event.deltaY)
        if (event.deltaY < 0) {
            scaleX += 0.1;
        } else {
            scaleX -= 0.1;
        }
        periodic.style.transform = 'scale(' + scaleX + ')';
    }
    // onMouseDown
    catch(event) {
        var periodic = this.periodicElement;
        this.setState(
            {
                hold: true,
                catchX: event.pageX,
                catchY: event.pageY,
                periodicLeft: this.getPeriodicLeft(periodic),
                periodicTop: this.getPeriodicTop(periodic),
            }
        );
    }
    // on MouseMove
    move(event) {
        if (!this.state.hold) {
            return false;
        }
        var periodic = this.periodicElement;
        
        var offsetX = this.state.catchX - event.pageX;
        var offsetY = this.state.catchY - event.pageY;
        //console.log(offsetX);

        //var m = periodic.style['margin-left'].replace('px', '');
        //console.log(this.state.leftX);
        periodic.style['margin-left'] = (this.state.periodicLeft - offsetX) + 'px';
        periodic.style['margin-top'] = (this.state.periodicTop - offsetY) + 'px';
    }
    // onMouseUp
    leave(event) {
        var periodic = this.periodicElement;
        this.setState(
            {
                hold: false,
            }
        );
    }
    getPeriodicLeft(periodic)
    {
        var m = periodic.style['margin-left'].replace('px', '');
        return m ? parseInt(m) : 0;
    }
    getPeriodicTop(periodic)
    {
        var m = periodic.style['margin-top'].replace('px', '');
        return m ? parseInt(m) : 0;
    }
    render() {
        var myStyle = {
            height: 10*this.state.elWidth,
        };
        return (
            <div className="periodic-x">
                <div className="periodic-c"
                    ref={(ref) => { this.periodicX = ref; }}>
                    <div 
                        className="periodic" 
                        style={myStyle} 
                        ref={(ref) => { this.periodicElement = ref; }}
                        onWheel={(e) => this.wheel(e)}
                        onMouseDown={(e) => this.catch(e)}
                        onMouseMove={(e) => this.move(e)}
                        onMouseUp={(e) => this.leave(e)}>
                        {this.state.data.elements.map((element, i) => <Element 
                            key = {i} 
                            data = {element} 
                            elWidth = {this.state.elWidth}
                            onChangeFilter={this.changeFilter} />)}
                    </div>
                </div>
            </div>
        );
    }
 }

const mapSizesToProps = ({ width, height }) => ({
    winWidth: width,
    winHeight: height,
})

export default withSizes(mapSizesToProps)(Content)