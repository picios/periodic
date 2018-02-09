import React from 'react';
import Element from './Element.jsx';
import withSizes from 'react-sizes'
import ItemDialog from './ItemDialog.jsx';

class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: require('../data/PeriodicTableJSON.json'),
            elWidth: Math.floor((props.winWidth) / 18),
            hold: false,
            catchX: null,
            catchY: null,
            periodicLeft: null,
            periodicTop: null,
            left: 0,
            top: 0,
            scale: 1,
            current: null,
        }
        //console.log('constructed');
    }
    componentDidMount() {
        var h = this.props.winHeight - this.periodicX.offsetTop;
        this.periodicX.style.height = h + 'px';
        //console.log(this,h)
    }
    handleFilterUpdate(current) {
        this.setState({
            current: current
        })
    }
    handleFilterCloseItem() {
        this.setState({
            current: null
        })
    }
    handleFilterPrev() {
        if (this.state.current === 0) {
            return;
        }
        this.setState({
            current: this.state.current - 1
        })
    }
    handleFilterNext() {
        //console.log(this.state.current, this.state.data.elements.length);
        if (this.state.current+1 === this.state.data.elements.length) {
            return;
        }
        this.setState({
            current: this.state.current + 1
        })
    }
    // onWheel
    wheel(event) {
        var scaleX = this.state.scale;
        if (event.deltaY < 0 && scaleX < 2.5 ) {
            scaleX += 0.1;
        } else if (event.deltaY > 0 && scaleX > .2) {
            scaleX -= 0.1;
        }
        this.setState({
            scale: scaleX
        });
    }
    // onMouseDown
    catch(event) {
        //console.log(event.touches[0].pageX);
        //var periodic = this.periodicElement;
        var co = this.getPageCoordinates(event);
        this.setState(
            {
                hold: true,
                catchX: co.x,
                catchY: co.y,
                periodicLeft: this.state.left,
                periodicTop: this.state.top,
            }
        );
        //console.log(this.state);
    }
    // on MouseMove
    move(event) {
        if (!this.state.hold) {
            return false;
        }
        //var periodic = this.periodicElement;
        var co = this.getPageCoordinates(event);

        var offsetX = this.state.catchX - co.x;
        var offsetY = this.state.catchY - co.y;
        //console.log(event.pageY, this.state.catchY);

        //var m = periodic.style['margin-left'].replace('px', '');
        //console.log(this.state.leftX);
        this.setState({
            left: this.state.periodicLeft - offsetX,
            top: this.state.periodicTop - offsetY
        });
    }
    // onMouseUp
    leave(event) {
        //var periodic = this.periodicElement;
        this.setState(
            {
                hold: false,
            }
        );
    }
    getClass() {
        var classes = ['periodic'];
        if (this.state.hold) {
            classes.push('hold');
        }
        return classes.join(' ');
    }
    // returns pageX and pageY for mobile and desktop
    getPageCoordinates(event)
    {
        return {
            x: event.pageX ? event.pageX : event.touches[0].pageX,
            y: event.pageY ? event.pageY : event.touches[0].pageY,
        }
    }
    render() {
        var myStyle = {
            height: 10*this.state.elWidth,
            marginTop: this.state.top,
            marginLeft: this.state.left,
            transform: 'scale(' + this.state.scale +')', 
        };

        var showItem = (this.state.current !== null ? true : false);
        //console.log(this.state.current, showItem)
        var currentData = this.state.current !== null ? this.state.data.elements[this.state.current] : null;
        //console.log(currentData);
        return (
            <div className="periodic-x">
                <div className="periodic-c"
                    ref={(ref) => { this.periodicX = ref; }}>
                    <div 
                        className={this.getClass()} 
                        style={myStyle} 
                        ref={(ref) => { this.periodicElement = ref; }}
                        onWheel={(e) => this.wheel(e)}
                        onMouseDown={(e) => this.catch(e)}
                        onMouseMove={(e) => this.move(e)}
                        onMouseUp={(e) => this.leave(e)}
                        onTouchStart={(e) => this.catch(e)}
                        onTouchMove={(e) => this.move(e)}
                        onTouchEnd={(e) => this.leave(e)}>
                        {this.state.data.elements.map((element, i) => <Element 
                            key = {i}
                            index = {i}
                            data = {element} 
                            elWidth = {this.state.elWidth}
                            updateOpenDialog={this.handleFilterUpdate.bind(this)}
                         />)}
                    </div>
                </div>
                <ItemDialog 
                    show = {showItem} 
                    data = {currentData}
                    winWidth = {this.props.winWidth}
                    winHeight = {this.props.winHeight} 
                    onCloseFilter = {this.handleFilterCloseItem.bind(this)}
                    onPrevFilter={this.handleFilterPrev.bind(this)}
                    onNextFilter={this.handleFilterNext.bind(this)}
                    />
            </div>
        );
    }
 }

const mapSizesToProps = ({ width, height }) => ({
    winWidth: width,
    winHeight: height,
})

export default withSizes(mapSizesToProps)(Content)